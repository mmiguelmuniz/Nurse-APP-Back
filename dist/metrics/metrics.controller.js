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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const metrics_service_1 = require("./metrics.service");
const jwt_auth_guard_1 = require("../common/jwt-auth.guard");
let MetricsController = class MetricsController {
    constructor(svc) {
        this.svc = svc;
    }
    kpis(period = 'hoje') {
        return this.svc.kpis(period);
    }
    daily(days = '14') {
        return this.svc.seriesDaily(Number(days));
    }
    weekly(weeks = '8') {
        return this.svc.seriesWeekly(Number(weeks));
    }
    top(limit = '6', period = 'semana') {
        return this.svc.topReasons(Number(limit), period);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('kpis'),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "kpis", null);
__decorate([
    (0, common_1.Get)('series/daily'),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "daily", null);
__decorate([
    (0, common_1.Get)('series/weekly'),
    __param(0, (0, common_1.Query)('weeks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "weekly", null);
__decorate([
    (0, common_1.Get)('reasons/top'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "top", null);
exports.MetricsController = MetricsController = __decorate([
    (0, common_1.Controller)('metrics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map