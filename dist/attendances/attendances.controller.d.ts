import { AttendancesService } from './attendances.service';
export declare class AttendancesController {
    private svc;
    constructor(svc: AttendancesService);
    list(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        class: {
            id: string;
            name: string;
            createdAt: Date;
            stage: string | null;
        } | null;
        motivo: {
            id: string;
            name: string;
            active: boolean;
        } | null;
        comunicacao: {
            id: string;
            name: string;
        } | null;
        medications: ({
            item: {
                id: string;
                createdAt: Date;
                categoria: import(".prisma/client").$Enums.ItemCategory;
                nome: string;
                unidade: string;
                minimo: number;
                estoqueAtual: number;
                active: boolean;
            };
        } & {
            id: string;
            quantidade: number;
            itemId: string;
            attendanceId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        nome: string;
        responsavel: string | null;
        descricao: string | null;
        vinculo: string | null;
        funcao: string | null;
        destino: string | null;
        horaChegada: Date | null;
        hgt: number | null;
        temperatura: number | null;
        fc: number | null;
        pa: string | null;
        spo2: number | null;
        classId: string | null;
        motivoId: string | null;
        comunicacaoId: string | null;
        userId: string | null;
    })[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__AttendanceClient<({
        movements: {
            id: string;
            createdAt: Date;
            tipo: import(".prisma/client").$Enums.MovementType;
            quantidade: number;
            motivo: string | null;
            itemId: string;
            attendanceId: string | null;
        }[];
        medications: ({
            item: {
                id: string;
                createdAt: Date;
                categoria: import(".prisma/client").$Enums.ItemCategory;
                nome: string;
                unidade: string;
                minimo: number;
                estoqueAtual: number;
                active: boolean;
            };
        } & {
            id: string;
            quantidade: number;
            itemId: string;
            attendanceId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        nome: string;
        responsavel: string | null;
        descricao: string | null;
        vinculo: string | null;
        funcao: string | null;
        destino: string | null;
        horaChegada: Date | null;
        hgt: number | null;
        temperatura: number | null;
        fc: number | null;
        pa: string | null;
        spo2: number | null;
        classId: string | null;
        motivoId: string | null;
        comunicacaoId: string | null;
        userId: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(body: any): Promise<{
        id: string;
        createdAt: Date;
        nome: string;
        responsavel: string | null;
        descricao: string | null;
        vinculo: string | null;
        funcao: string | null;
        destino: string | null;
        horaChegada: Date | null;
        hgt: number | null;
        temperatura: number | null;
        fc: number | null;
        pa: string | null;
        spo2: number | null;
        classId: string | null;
        motivoId: string | null;
        comunicacaoId: string | null;
        userId: string | null;
    }>;
    update(id: string, body: any): import(".prisma/client").Prisma.Prisma__AttendanceClient<{
        id: string;
        createdAt: Date;
        nome: string;
        responsavel: string | null;
        descricao: string | null;
        vinculo: string | null;
        funcao: string | null;
        destino: string | null;
        horaChegada: Date | null;
        hgt: number | null;
        temperatura: number | null;
        fc: number | null;
        pa: string | null;
        spo2: number | null;
        classId: string | null;
        motivoId: string | null;
        comunicacaoId: string | null;
        userId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__AttendanceClient<{
        id: string;
        createdAt: Date;
        nome: string;
        responsavel: string | null;
        descricao: string | null;
        vinculo: string | null;
        funcao: string | null;
        destino: string | null;
        horaChegada: Date | null;
        hgt: number | null;
        temperatura: number | null;
        fc: number | null;
        pa: string | null;
        spo2: number | null;
        classId: string | null;
        motivoId: string | null;
        comunicacaoId: string | null;
        userId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=attendances.controller.d.ts.map