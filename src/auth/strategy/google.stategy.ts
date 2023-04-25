import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from '../google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleService: GoogleAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/redirect`,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const userType = 'TOURIST';
    const user = await this.googleService.validateGoogleUser(
      {
        email: profile.emails[0].value,
        fullName: profile.displayName,
        subject: profile.id,
        provider: profile.provider,
        given_name: profile.name?.givenName,
        family_name: profile.name?.familyName,
        picture: profile.photos?.[0].value,
        sub: profile.id,
      },
      userType,
    );

    return user || null;
  }
}
