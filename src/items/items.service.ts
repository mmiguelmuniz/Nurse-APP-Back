import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCategory, MovementType } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  list(params: { categoria?: ItemCategory; busca?: string; ativos?: boolean }) {
    const { categoria, busca, ativos } = params;
    return this.prisma.item.findMany({
      where: {
        categoria,
        active: ativos === undefined ? undefined : ativos,
        OR: busca ? [{ nome: { contains: busca } }] : undefined,
      },
      orderBy: { nome: 'asc' },
    });
  }

  get(id: string) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async create(data: any) {
    const { estoqueAtual, ...rest } = data;
    const inicial = Number(estoqueAtual ?? 0);

    return this.prisma.$transaction(async (tx) => {
      // Cria o item com estoqueAtual = estoque inicial
      const item = await tx.item.create({
        data: { ...rest, estoqueAtual: inicial },
      });

      // Se tem estoque inicial, cria movement de entrada para manter histórico correto
      if (inicial > 0) {
        await tx.movement.create({
          data: {
            itemId: item.id,
            tipo: MovementType.ENTRADA,
            quantidade: inicial,
            motivo: 'Estoque inicial',
            contabilizaEstoque: true,
          },
        });
      }

      return item;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.item.update({ where: { id }, data });
  }

  async remove(id: string) {
    // Apenas inativa o item — preserva histórico de atendimentos e movimentos
    return this.prisma.item.update({
      where: { id },
      data: { active: false },
    });
  }

  async movimento(
    itemId: string,
    tipo: MovementType,
    quantidade: number,
    motivo?: string,
    attendanceId?: string,
  ) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item não encontrado');

    // Bloqueia saída se estoque insuficiente
    if (tipo === MovementType.SAIDA && item.descontaEstoque && item.estoqueAtual < quantidade) {
      throw new BadRequestException(
        `Estoque insuficiente. Disponível: ${item.estoqueAtual} ${item.unidade ?? ''}`
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Cria o movimento com contabilizaEstoque = true
      await tx.movement.create({
        data: {
          itemId,
          tipo,
          quantidade,
          motivo,
          attendanceId,
          contabilizaEstoque: item.descontaEstoque !== false,
        },
      });

      // Recalcula saldo somando todos os movimentos contabilizados
      const agg = await tx.movement.groupBy({
        by: ['tipo'],
        where: { itemId, contabilizaEstoque: true },
        _sum: { quantidade: true },
      });

      const entrada = agg.find((a) => a.tipo === 'ENTRADA')?._sum.quantidade ?? 0;
      const saida   = agg.find((a) => a.tipo === 'SAIDA')?._sum.quantidade ?? 0;

      const novoEstoque = Number(entrada) - Number(saida);

      await tx.item.update({
        where: { id: itemId },
        data: { estoqueAtual: novoEstoque },
      });

      return { estoqueAtual: novoEstoque };
    });
  }

  criticos() {
    return this.prisma.$queryRaw<any[]>`
      SELECT id, nome, estoqueAtual, minimo, categoria, unidade
      FROM Item
      WHERE active = true
        AND descontaEstoque = true
        AND minimo > 0
        AND estoqueAtual < minimo
      ORDER BY estoqueAtual ASC, nome ASC
    `;
  }
}