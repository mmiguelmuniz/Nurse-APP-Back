import { ItemsService } from './items.service';
import { ItemCategory } from '@prisma/client';
export declare class ItemsController {
    private items;
    constructor(items: ItemsService);
    list(categoria?: ItemCategory, busca?: string, ativos?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }[]>;
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
    create(body: any): Promise<{
        id: string;
        createdAt: Date;
        categoria: import(".prisma/client").$Enums.ItemCategory;
        nome: string;
        unidade: string;
        minimo: number;
        estoqueAtual: number;
        active: boolean;
    }>;
    update(id: string, body: any): Promise<{
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
    entrada(id: string, quantidade: number, motivo?: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import(".prisma/client").$Enums.MovementType;
        quantidade: number;
        motivo: string | null;
        itemId: string;
        attendanceId: string | null;
    }>;
    saida(id: string, quantidade: number, motivo?: string, attendanceId?: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import(".prisma/client").$Enums.MovementType;
        quantidade: number;
        motivo: string | null;
        itemId: string;
        attendanceId: string | null;
    }>;
}
//# sourceMappingURL=items.controller.d.ts.map