import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async kpis(period: 'hoje'|'semana'|'mes') {
    const now = new Date();
    const start = new Date(now);
    if (period === 'hoje') start.setHours(0,0,0,0);
    if (period === 'semana') start.setDate(now.getDate() - 7);
    if (period === 'mes') start.setMonth(now.getMonth() - 1);
    const count = await this.prisma.attendance.count({ where: { createdAt: { gte: start }}});
    const emergencias = await this.prisma.attendance.count({ where: { createdAt: { gte: start }, destino: { contains: 'Emerg' }}});
    const itensCriticos = await this.prisma.item.count({ where: { estoqueAtual: { lt: 5 }, active: true }});
    return { atendimentos: count, emergencias, itensCriticos };
  }

  async seriesDaily(days = 14) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    const rows = await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT DATE(createdAt) as day, COUNT(*) as qty
       FROM Attendance
       WHERE createdAt BETWEEN '${start.toISOString().slice(0,10)}' AND '${end.toISOString().slice(0,10)}'
       GROUP BY day ORDER BY day;`
    );
    return rows;
  }

  async seriesWeekly(weeks = 8) {
    const rows = await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT YEARWEEK(createdAt, 1) as yearweek, COUNT(*) as qty
       FROM Attendance
       GROUP BY yearweek
       ORDER BY yearweek DESC
       LIMIT ${Number(weeks)};`
    );
    return rows.reverse();
  }

  async topReasons(limit = 6, period: 'semana'|'mes' = 'semana') {
    const start = new Date();
    if (period === 'semana') start.setDate(start.getDate() - 7);
    else start.setMonth(start.getMonth() - 1);
    const rows = await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT r.name as reason, COUNT(a.id) as qty
       FROM Attendance a
       JOIN Reason r ON r.id = a.motivoId
       WHERE a.createdAt >= '${start.toISOString().slice(0,10)}'
       GROUP BY r.name
       ORDER BY qty DESC
       LIMIT ${Number(limit)};`
    );
    return rows;
  }
}
