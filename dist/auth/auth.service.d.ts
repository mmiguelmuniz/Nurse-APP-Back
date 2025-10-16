import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private jwt;
    private prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    validateGoogleProfile(profile: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    signTokens(user: {
        id: string;
        email: string;
        role: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
}
//# sourceMappingURL=auth.service.d.ts.map