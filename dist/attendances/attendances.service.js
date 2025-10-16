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
exports.AttendancesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AttendancesService = class AttendancesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(params) {
        const { page = 1, pageSize = 20, busca, turma, motivo, start, end } = params;
        const where = {};
        if (busca)
            where.OR = [
                { nome: { contains: busca } },
                { descricao: { contains: busca } },
                { responsavel: { contains: busca } },
            ];
        if (turma)
            where.classId = turma;
        if (motivo)
            where.motivoId = motivo;
        if (start || end)
            where.createdAt = { gte: start ? new Date(start) : undefined, lte: end ? new Date(end) : undefined };
        return this.prisma.attendance.findMany({
            where,
            include: { medications: { include: { item: true } }, class: true, motivo: true, comunicacao: true },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
        });
    }
    get(id) {
        return this.prisma.attendance.findUnique({
            where: { id },
            include: { medications: { include: { item: true } }, movements: true },
        });
    }
    async create(data) {
        return this.prisma.$transaction(async (tx) => {
            var _a, _b;
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
                        where: { attendanceId_itemId: { attendanceId: attendance.id, itemId: m.itemId } },
                        create: { attendanceId: attendance.id, itemId: m.itemId, quantidade: m.quantidade },
                        update: { quantidade: m.quantidade },
                    });
                    await tx.movement.create({
                        data: { itemId: m.itemId, tipo: client_1.MovementType.SAIDA, quantidade: Number(m.quantidade), attendanceId: attendance.id, motivo: 'Uso em atendimento' }
                    });
                    const agg = await tx.movement.groupBy({
                        by: ['tipo'],
                        where: { itemId: m.itemId },
                        _sum: { quantidade: true },
                    });
                    const entrada = ((_a = agg.find(a => a.tipo === 'ENTRADA')) === null || _a === void 0 ? void 0 : _a._sum.quantidade) || 0;
                    const saida = ((_b = agg.find(a => a.tipo === 'SAIDA')) === null || _b === void 0 ? void 0 : _b._sum.quantidade) || 0;
                    await tx.item.update({ where: { id: m.itemId }, data: { estoqueAtual: entrada - saida } });
                }
            }
            return attendance;
        });
    }
    update(id, data) {
        return this.prisma.attendance.update({ where: { id }, data });
    }
    remove(id) {
        return this.prisma.attendance.delete({ where: { id } });
    }
};
exports.AttendancesService = AttendancesService;
exports.AttendancesService = AttendancesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendancesService);
//# sourceMappingURL=attendances.service.js.map