import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prisma.item.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.item.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.item.delete({ where: { id } });
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

    const movement = await this.prisma.$transaction(async (tx) => {
      const mov = await tx.movement.create({
        data: {
          itemId,
          tipo,
          quantidade,
          motivo,
          attendanceId,
          // contabilizaEstoque fica como default true (manual sempre conta)
        },
      });

      // ✅ estoque = soma(ENTRADA) - soma(SAIDA) apenas do que contabilizaEstoque=true
      const agg = await tx.movement.groupBy({
        by: ['tipo'],
        where: { itemId, contabilizaEstoque: true },
        _sum: { quantidade: true },
      });

      const entrada = agg.find((a) => a.tipo === 'ENTRADA')?._sum.quantidade ?? 0;
      const saida = agg.find((a) => a.tipo === 'SAIDA')?._sum.quantidade ?? 0;

      await tx.item.update({
        where: { id: itemId },
        data: { estoqueAtual: entrada - saida },
      });

      return mov;
    });

    return movement;
  }

 criticos() {
  return this.prisma.item.findMany({
    where: {
      active: true,
      descontaEstoque: true,
      minimo: { gt: 0 },
      estoqueAtual: { lt: this.prisma.item.fields.minimo },
    },
    orderBy: [{ estoqueAtual: 'asc' }, { nome: 'asc' }],
  });
 }}

