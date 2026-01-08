import { PrismaService } from '../prisma/prisma.service';
import { ItemCategory, MovementType } from '@prisma/client';
export declare class ItemsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(params: {
        categoria?: ItemCategory;
        busca?: string;
        ativos?: boolean;
    }): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__ItemClient<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }>;
    movimento(itemId: string, tipo: MovementType, quantidade: number, motivo?: string, attendanceId?: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import(".prisma/client").$Enums.MovementType;
        quantidade: number;
        motivo: string | null;
        itemId: string;
        attendanceId: string | null;
    }>;
    criticos(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }[]>;
}
//# sourceMappingURL=items.service.d.ts.map