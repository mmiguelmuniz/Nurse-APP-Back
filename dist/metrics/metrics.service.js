"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MetricsService = class MetricsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async kpis(period) {
        const now = new Date();
        const start = new Date(now);
        if (period === 'hoje')
            start.setHours(0, 0, 0, 0);
        if (period === 'semana')
            start.setDate(now.getDate() - 7);
        if (period === 'mes')
            start.setMonth(now.getMonth() - 1);
        const count = await this.prisma.attendance.count({ where: { createdAt: { gte: start } } });
        const emergencias = await this.prisma.attendance.count({ where: { createdAt: { gte: start }, destino: { contains: 'Emerg' } } });
        const itensCriticos = await this.prisma.item.count({ where: { estoqueAtual: { lt: 5 }, active: true } });
        return { atendimentos: count, emergencias, itensCriticos };
    }
    async seriesDaily(days = 14) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days + 1);
        const rows = await this.prisma.$queryRawUnsafe(`SELECT DATE(createdAt) as day, COUNT(*) as qty
       FROM Attendance
       WHERE createdAt BETWEEN '${start.toISOString().slice(0, 10)}' AND '${end.toISOString().slice(0, 10)}'
       GROUP BY day ORDER BY day;`);
        return rows;
    }
    async seriesWeekly(weeks = 8) {
        const rows = await this.prisma.$queryRawUnsafe(`SELECT YEARWEEK(createdAt, 1) as yearweek, COUNT(*) as qty
       FROM Attendance
       GROUP BY yearweek
       ORDER BY yearweek DESC
       LIMIT ${Number(weeks)};`);
        return rows.reverse();
    }
    async topReasons(limit = 6, period = 'semana') {
        const start = new Date();
        if (period === 'semana')
            start.setDate(start.getDate() - 7);
        else
            start.setMonth(start.getMonth() - 1);
        const rows = await this.prisma.$queryRawUnsafe(`SELECT r.name as reason, COUNT(a.id) as qty
       FROM Attendance a
       JOIN Reason r ON r.id = a.motivoId
       WHERE a.createdAt >= '${start.toISOString().slice(0, 10)}'
       GROUP BY r.name
       ORDER BY qty DESC
       LIMIT ${Number(limit)};`);
        return rows;
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map