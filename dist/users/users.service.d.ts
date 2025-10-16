import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findMe(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    listAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    updateRole(id: string, role: Role): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=users.service.d.ts.map