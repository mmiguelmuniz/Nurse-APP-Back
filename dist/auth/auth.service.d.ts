import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private jwt;
    private prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    validateGoogleProfile(profile: any): Promise<{
        id: string;
        email: string;
        name: string;
        pictureUrl: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
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