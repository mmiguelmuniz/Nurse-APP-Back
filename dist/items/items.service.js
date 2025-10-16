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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ItemsService = class ItemsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(params) {
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
    get(id) {
        return this.prisma.item.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.item.create({ data });
    }
    async update(id, data) {
        return this.prisma.item.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.item.delete({ where: { id } });
    }
    async movimento(itemId, tipo, quantidade, motivo, attendanceId) {
        const item = await this.prisma.item.findUnique({ where: { id: itemId } });
        if (!item)
            throw new common_1.NotFoundException('Item não encontrado');
        const movement = await this.prisma.$transaction(async (tx) => {
            var _a, _b;
            const mov = await tx.movement.create({
                data: { itemId, tipo, quantidade, motivo, attendanceId },
            });
            const agg = await tx.movement.groupBy({
                by: ['tipo'],
                where: { itemId },
                _sum: { quantidade: true },
            });
            const entrada = ((_a = agg.find(a => a.tipo === 'ENTRADA')) === null || _a === void 0 ? void 0 : _a._sum.quantidade) || 0;
            const saida = ((_b = agg.find(a => a.tipo === 'SAIDA')) === null || _b === void 0 ? void 0 : _b._sum.quantidade) || 0;
            await tx.item.update({ where: { id: itemId }, data: { estoqueAtual: entrada - saida } });
            return mov;
        });
        return movement;
    }
    criticos() {
        return this.prisma.item.findMany({
            where: { active: true, estoqueAtual: { lt: 5 } },
            orderBy: { estoqueAtual: 'asc' },
        });
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map