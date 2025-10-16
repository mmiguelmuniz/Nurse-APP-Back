import { ItemsService } from './items.service';
import { ItemCategory } from '@prisma/client';
export declare class ItemsController {
    private items;
    constructor(items: ItemsService);
    list(categoria?: ItemCategory, busca?: string, ativos?: string): import(".prisma/client").Prisma.PrismaPromise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }[]>;
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
    create(body: any): Promise<{
        active: boolean;
        id: string;
        createdAt: Date;
        nome: string;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
    }>;
    update(id: string, body: any): Promise<{
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
    entrada(id: string, quantidade: number, motivo?: string): Promise<{
        id: string;
        createdAt: Date;
        motivo: string | null;
        attendanceId: string | null;
        itemId: string;
        quantidade: number;
        tipo: import(".prisma/client").$Enums.MovementType;
    }>;
    saida(id: string, quantidade: number, motivo?: string, attendanceId?: string): Promise<{
        id: string;
        createdAt: Date;
        motivo: string | null;
        attendanceId: string | null;
        itemId: string;
        quantidade: number;
        tipo: import(".prisma/client").$Enums.MovementType;
    }>;
}
//# sourceMappingURL=items.controller.d.ts.map