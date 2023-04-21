import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ResponsibleService } from '../responsible.service';
import { Responsible } from '../schema/resposible.schema';

@Injectable()
export class GoogleResponsibleStrategy extends PassportStrategy(
  Strategy,
  'googleResponsible',
) {
  constructor(private readonly responsibleService: ResponsibleService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/responsible/redirect`,
      scope: ['profile', 'email'],
      prompt: 'select_account consent',
    });
  }

  authorizationParams(options: any): object {
    return Object.assign(options, {
      prompt: 'select_account',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<Responsible> {
    const user = await this.responsibleService.validateUser({
      email: profile.emails[0].value,
      fullName: profile.displayName,
      subject: profile.id,
      provider: profile.provider,
      picture: profile._json.picture,
    });
    return user || null;
  }
}
