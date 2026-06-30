import { Controller, Get, Req, Res, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const tokens = this.auth.signTokens(user);
    return res.redirect(
      `${process.env.CORS_ORIGIN}/login?access=${tokens.accessToken}&refresh=${tokens.refreshToken}`
    );
  }

  @Post('refresh')
  async refresh(@Body() body: any) {
    const refreshToken = body?.refresh || body?.refreshToken;
    if (!refreshToken) throw new UnauthorizedException('Refresh token não fornecido');
    return this.auth.refreshAccessToken(refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return req.user;
  }
}