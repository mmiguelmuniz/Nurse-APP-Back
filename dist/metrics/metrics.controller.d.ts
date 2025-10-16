import { MetricsService } from './metrics.service';
export declare class MetricsController {
    private svc;
    constructor(svc: MetricsService);
    kpis(period?: 'hoje' | 'semana' | 'mes'): Promise<{
        atendimentos: number;
        emergencias: number;
        itensCriticos: number;
    }>;
    daily(days?: string): Promise<any[]>;
    weekly(weeks?: string): Promise<any[]>;
    top(limit?: string, period?: 'semana' | 'mes'): Promise<any[]>;
}
//# sourceMappingURL=metrics.controller.d.ts.map