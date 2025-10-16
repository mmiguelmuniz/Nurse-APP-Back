import { PrismaService } from '../prisma/prisma.service';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    kpis(period: 'hoje' | 'semana' | 'mes'): Promise<{
        atendimentos: number;
        emergencias: number;
        itensCriticos: number;
    }>;
    seriesDaily(days?: number): Promise<any[]>;
    seriesWeekly(weeks?: number): Promise<any[]>;
    topReasons(limit?: number, period?: 'semana' | 'mes'): Promise<any[]>;
}
//# sourceMappingURL=metrics.service.d.ts.map