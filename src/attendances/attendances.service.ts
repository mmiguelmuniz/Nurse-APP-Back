import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovementType } from '@prisma/client';

@Injectable()
export class AttendancesService {
  constructor(private prisma: PrismaService) {}

  list(params: any) {
    const { page = 1, pageSize = 20, busca, turma, motivo, start, end } = params;

    const where: any = {};

    if (busca) {
      where.OR = [
        { nome: { contains: busca } },
        { descricao: { contains: busca } },
        { responsavel: { contains: busca } },
      ];
    }

    if (turma) where.classId = turma;
    if (motivo) where.motivoId = motivo;

    if (start || end) {
      where.createdAt = {
        gte: start ? new Date(start) : undefined,
        lte: end ? new Date(end) : undefined,
      };
    }

    return this.prisma.attendance.findMany({
      where,
      include: {
        user: true,
        medications: { include: { item: true } },
        class: true,
        motivo: true,
        comunicacao: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    });
  }

  get(id: string) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: {
        user: true,
        medications: { include: { item: true } },
        movements: true,
        class: true,
        motivo: true,
        comunicacao: true,
      },
    });
  }

  async create(data: any, userId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const attendance = await tx.attendance.create({
        data: {
          nome: data.nome,
          vinculo: data.vinculo,
          funcao: data.funcao,
          descricao: data.descricao ?? null,
          responsavel: data.responsavel ?? null,
          destino: data.destino,
          horaChegada: data.horaChegada ? new Date(data.horaChegada) : null,
          hgt: data.hgt ?? null,
          temperatura: data.temperatura ?? null,
          fc: data.fc ?? null,
          pa: data.pa ?? null,
          spo2: data.spo2 ?? null,

          classId: data.classId ?? null,
          motivoId: data.motivoId ?? null,
          comunicacaoId: data.comunicacaoId ?? null,

          userId: userId ?? null,
        },
      });

      if (Array.isArray(data.medications)) {
        for (const m of data.medications) {
          const quantidade = Number(m.quantidade);

          // 1) sempre registra o item no atendimento (histórico clínico)
          await tx.attendanceMedication.upsert({
            where: {
              attendanceId_itemId: {
                attendanceId: attendance.id,
                itemId: m.itemId,
              },
            },
            create: {
              attendanceId: attendance.id,
              itemId: m.itemId,
              quantidade,
            },
            update: { quantidade },
          });

          // 2) descobre se esse item deve descontar estoque
          const item = await tx.item.findUnique({
            where: { id: m.itemId },
            select: { id: true, descontaEstoque: true, estoqueAtual: true },
          });

          // se por algum motivo o item não existir, ainda assim não quebra a transação,
          // mas você pode preferir lançar erro. Mantive seguro:
          const desconta = item?.descontaEstoque !== false; // default true

          // 3) se desconta, valida estoque disponível (se não desconta, não valida)
          if (desconta && item) {
            if (item.estoqueAtual < quantidade) {
              // você pode trocar por BadRequestException se quiser mensagem melhor
              throw new Error(`Estoque insuficiente para o item (${m.itemId}).`);
            }
          }

          // 4) sempre cria movement (auditoria), mas marca se contabiliza ou não
          await tx.movement.create({
            data: {
              itemId: m.itemId,
              tipo: MovementType.SAIDA,
              quantidade,
              attendanceId: attendance.id,
              motivo: 'Uso em atendimento',
              contabilizaEstoque: desconta, // ✅ a regra
            },
          });

          // 5) só recalcula estoque se esse item for controlado
          if (desconta) {
            const agg = await tx.movement.groupBy({
              by: ['tipo'],
              where: { itemId: m.itemId, contabilizaEstoque: true }, // ✅ ignora movimentos sem baixa
              _sum: { quantidade: true },
            });

            const entrada = agg.find((a) => a.tipo === 'ENTRADA')?._sum.quantidade ?? 0;
            const saida = agg.find((a) => a.tipo === 'SAIDA')?._sum.quantidade ?? 0;

            await tx.item.update({
              where: { id: m.itemId },
              data: { estoqueAtual: entrada - saida },
            });
          }
        }
      }

      return attendance;
    });
  }

  update(id: string, data: any) {
    return this.prisma.attendance.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.attendance.delete({ where: { id } });
  }
}
