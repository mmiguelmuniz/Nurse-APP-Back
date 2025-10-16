import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import type { Profile } from 'passport'; // <- o tipo vem daqui

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile, // <- agora é o tipo certo
  ) {
    const { id, displayName, emails, photos } = profile;
    return {
      provider: 'google',
      providerId: id,
      name: displayName,
      email: emails?.[0]?.value,
      pictureUrl: photos?.[0]?.value,
      accessToken,
    };
  }
}
