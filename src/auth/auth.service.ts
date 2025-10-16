import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async validateGoogleProfile(profile: any) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;
    const pictureUrl = profile.photos?.[0]?.value;
    if (!email) throw new UnauthorizedException('Google profile missing email');
    const user = await this.prisma.user.upsert({
      where: { email },
      update: { name, pictureUrl },
      create: { email, name, pictureUrl, role: Role.STAFF },
    });
    return user;
  }

  signTokens(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
    const refreshToken = this.jwt.sign({ sub: user.id }, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });
    return { accessToken, refreshToken };
  }
}
