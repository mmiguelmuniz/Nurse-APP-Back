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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const jwt_auth_guard_1 = require("../common/jwt-auth.guard");
const client_1 = require("@prisma/client");
let ItemsController = class ItemsController {
    constructor(items) {
        this.items = items;
    }
    list(categoria, busca, ativos) {
        return this.items.list({ categoria, busca, ativos: ativos ? ativos === 'true' : undefined });
    }
    criticos() {
        return this.items.criticos();
    }
    get(id) {
        return this.items.get(id);
    }
    create(body) {
        return this.items.create(body);
    }
    update(id, body) {
        return this.items.update(id, body);
    }
    remove(id) {
        return this.items.remove(id);
    }
    entrada(id, quantidade, motivo) {
        return this.items.movimento(id, client_1.MovementType.ENTRADA, Number(quantidade), motivo);
    }
    saida(id, quantidade, motivo, attendanceId) {
        return this.items.movimento(id, client_1.MovementType.SAIDA, Number(quantidade), motivo, attendanceId);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('categoria')),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('ativos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('criticos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "criticos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/entrada'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantidade')),
    __param(2, (0, common_1.Body)('motivo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "entrada", null);
__decorate([
    (0, common_1.Post)(':id/saida'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantidade')),
    __param(2, (0, common_1.Body)('motivo')),
    __param(3, (0, common_1.Body)('attendanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "saida", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map