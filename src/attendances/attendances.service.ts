import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovementType } from '@prisma/client';

@Injectable()
export class AttendancesService {
  constructor(private prisma: PrismaService) {}

  list(params: any) {
    const { page = 1, pageSize = 20, busca, turma, motivo, start, end } = params;
    const where: any = {};
    if (busca) where.OR = [
      { nome: { contains: busca } },
      { descricao: { contains: busca } },
      { responsavel: { contains: busca } },
    ];
    if (turma) where.classId = turma;
    if (motivo) where.motivoId = motivo;
    if (start || end) where.createdAt = { gte: start ? new Date(start) : undefined, lte: end ? new Date(end) : undefined };
    return this.prisma.attendance.findMany({
      where,
      include: { medications: { include: { item: true } }, class: true, motivo: true, comunicacao: true },
      orderBy: { createdAt: 'desc' },
      skip: (page-1)*pageSize,
      take: Number(pageSize),
    });
  }

  get(id: string) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: { medications: { include: { item: true } }, movements: true },
    });
  }

  async create(data: any) {
    return this.prisma.$transaction(async (tx) => {
      const attendance = await tx.attendance.create({
        data: {
          nome: data.nome, vinculo: data.vinculo, funcao: data.funcao, descricao: data.descricao,
          responsavel: data.responsavel, destino: data.destino, horaChegada: data.horaChegada ? new Date(data.horaChegada) : null,
          hgt: data.hgt, temperatura: data.temperatura, fc: data.fc, pa: data.pa, spo2: data.spo2,
          classId: data.classId, motivoId: data.motivoId, comunicacaoId: data.comunicacaoId, userId: data.userId
        },
      });
      if (Array.isArray(data.medications)) {
        for (const m of data.medications) {
          await tx.attendanceMedication.upsert({
            where: { attendanceId_itemId: { attendanceId: attendance.id, itemId: m.itemId }},
            create: { attendanceId: attendance.id, itemId: m.itemId, quantidade: m.quantidade },
            update: { quantidade: m.quantidade },
          });
          await tx.movement.create({
            data: { itemId: m.itemId, tipo: MovementType.SAIDA, quantidade: Number(m.quantidade), attendanceId: attendance.id, motivo: 'Uso em atendimento' }
          });
          const agg = await tx.movement.groupBy({
            by: ['tipo'],
            where: { itemId: m.itemId },
            _sum: { quantidade: true },
          });
          const entrada = agg.find(a=>a.tipo==='ENTRADA')?._sum.quantidade || 0;
          const saida = agg.find(a=>a.tipo==='SAIDA')?._sum.quantidade || 0;
          await tx.item.update({ where: { id: m.itemId }, data: { estoqueAtual: entrada - saida } });
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
