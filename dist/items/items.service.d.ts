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
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__ItemClient<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): Promise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }>;
    update(id: string, data: any): Promise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }>;
    remove(id: string): Promise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }>;
    movimento(itemId: string, tipo: MovementType, quantidade: number, motivo?: string, attendanceId?: string): Promise<{
        id: string;
        createdAt: Date;
        motivo: string | null;
        attendanceId: string | null;
        itemId: string;
        quantidade: number;
        tipo: import(".prisma/client").$Enums.MovementType;
    }>;
    criticos(): import(".prisma/client").Prisma.PrismaPromise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }[]>;
}
//# sourceMappingURL=items.service.d.ts.map