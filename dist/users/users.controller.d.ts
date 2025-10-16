import { UsersService } from './users.service';
import { Role } from '@prisma/client';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    me(user: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    update(id: string, role: Role): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=users.controller.d.ts.map