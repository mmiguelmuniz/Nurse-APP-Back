import { PrismaService } from '../prisma/prisma.service';
export declare class AttendancesService {
    private prisma;
    constructor(prisma: PrismaService);
    list(params: any): import(".prisma/client").Prisma.PrismaPromise<({
        class: {
            id: string;
            createdAt: Date;
            name: string;
            stage: string | null;
        } | null;
        motivo: {
            active: boolean;
            id: string;
            name: string;
        } | null;
        comunicacao: {
            id: string;
            name: string;
        } | null;
        medications: ({
            item: {
                active: boolean;
                id: string;
                createdAt: Date;
                nome: string;
                categoria: import(".prisma/client").$Enums.ItemCategory;
                unidade: string;
                minimo: number;
                estoqueAtual: number;
            };
        } & {
            id: string;
            attendanceId: string;
            itemId: string;
            quantidade: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        nome: string;
        vinculo: string | null;
        funcao: string | null;
        descricao: string | null;
        responsavel: string | null;
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
        medications: ({
            item: {
                active: boolean;
                id: string;
                createdAt: Date;
                nome: string;
                categoria: import(".prisma/client").$Enums.ItemCategory;
                unidade: string;
                minimo: number;
                estoqueAtual: number;
            };
        } & {
            id: string;
            attendanceId: string;
            itemId: string;
            quantidade: number;
        })[];
        movements: {
            id: string;
            createdAt: Date;
            motivo: string | null;
            attendanceId: string | null;
            itemId: string;
            quantidade: number;
            tipo: import(".prisma/client").$Enums.MovementType;
        }[];
    } & {
        id: string;
        createdAt: Date;
        nome: string;
        vinculo: string | null;
        funcao: string | null;
        descricao: string | null;
        responsavel: string | null;
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
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        nome: string;
        vinculo: string | null;
        funcao: string | null;
        descricao: string | null;
        responsavel: string | null;
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
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__AttendanceClient<{
        id: string;
        createdAt: Date;
        nome: string;
        vinculo: string | null;
        funcao: string | null;
        descricao: string | null;
        responsavel: string | null;
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
        vinculo: string | null;
        funcao: string | null;
        descricao: string | null;
        responsavel: string | null;
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
//# sourceMappingURL=attendances.service.d.ts.map