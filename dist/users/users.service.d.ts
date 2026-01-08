import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findMe(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    listAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    updateRole(id: string, role: Role): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=users.service.d.ts.map