import { UsersService } from './users.service';
import { Role } from '@prisma/client';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    me(user: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    update(id: string, role: Role): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=users.controller.d.ts.map