import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Tourist } from '../schema/tourist.schema';
import { TouristService } from '../tourist.service';

@Injectable()
export class GoogleTouristStrategy extends PassportStrategy(Strategy, 'googleTourist') {
  constructor(private readonly touristService: TouristService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/tourist/redirect`,
      scope: ['profile', 'email'],
      prompt: 'select_account consent',
    });
  }

  authorizationParams(options: any): object {
    return Object.assign(options, {
      prompt: 'select_account',
    });
  }

  // async validate(accessToken: string, refreshToken: string, profile: any): Promise<Tourist> {
  //   const user = await this.touristService.validateUser({
  //     email: profile.emails[0].value,
  //     fullName: profile.displayName,
  //     subject: profile.id,
  //     provider: profile.provider,
  //     picture: profile._json.picture,
  //   });
  //   return user || null;
  // }
}
