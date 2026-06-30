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

    // Verifica se o email está autorizado
    const authorized = await this.prisma.authorizedEmail.findUnique({
      where: { email },
    });

    if (!authorized) {
      throw new UnauthorizedException(
        `Acesso negado. O email ${email} não está autorizado. Entre em contato com o administrador.`
      );
    }

    const user = await this.prisma.user.upsert({
      where: { email },
      update: { name, pictureUrl },
      create: {
        email,
        name,
        pictureUrl,
        role: authorized.role ?? Role.STAFF,
      },
    });

    return user;
  }

  signTokens(user: { id: string; email: string; role: string; name?: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name ?? user.email.split('@')[0],
    };
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '12h',
    });
    const refreshToken = this.jwt.sign({ sub: user.id }, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    });
    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException();
      return this.signTokens({ id: user.id, email: user.email, role: user.role, name: user.name });
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}