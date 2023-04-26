import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
// import { TouristRepository } from 'src/tourist/tourist.repository';
import { AgencyRegistrationDTO } from '../agency/dto/agency-register.dto';
import { TouristService } from '../tourist/tourist.service';
import { TouristRegistrationDTO } from '../tourist/dto/tourist-registration.dto';
import { AgencyService } from '../agency/agency.service';

export interface IGoogleUser {
  sub: string;
  given_name: string;
  family_name: string;
  fullName?: string;
  email: string;
  picture?: string;
  subject?: string;
  provider?: string;
}

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly turistService: TouristService,
    private readonly agencyService: AgencyService,
  ) {}

  generateGoogleAuthUrl(role: string): string {
    const scope = ['profile', 'email'];
    const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.GOOGLE_CLIENT_ID
    }&redirect_uri=${redirectUrl}&response_type=code&scope=${scope.join(' ')}&state=${role}`;
    console.log(url);
    return url;
  }

  async createTouristFromGoogle(googleUser: IGoogleUser): Promise<TouristRegistrationDTO> {
    let tourist: TouristRegistrationDTO = await this.turistService.getTouristByEmail(
      googleUser.email,
    );

    if (!tourist) {
      tourist = await this.turistService.getTouristByGoogleId(googleUser.sub);
    }

    if (!tourist) {
      tourist = await this.turistService.create({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        email: googleUser.email,
        googleId: googleUser.sub,
        password: googleUser.email,
        phoneNumber: '000000',
      });
    }
    return tourist;
  }

  async createAgencyFromGoogle(googleUser: IGoogleUser): Promise<AgencyRegistrationDTO> {
    let agency: AgencyRegistrationDTO = await this.agencyService.getAgencyByGoogleId(
      googleUser.sub,
    );

    if (agency?.email === googleUser.email) {
      return agency;
    }

    try {
      agency = await this.agencyService.createAgency({
        name: googleUser.given_name,
        email: googleUser.email,
        cnpj: '000000000',
        responsable: googleUser.given_name,
        password: googleUser.email,
      });
    } catch (error) {
      throw new HttpException('Could not create Agency', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return agency;
  }

  async validateGoogleUser(
    googleUser: IGoogleUser,
    role: string,
  ): Promise<AgencyRegistrationDTO | TouristRegistrationDTO> {
    if (role === 'TOURIST') {
      const tourist = await this.turistService.getTouristByGoogleId(googleUser.sub);
      if (!tourist) {
        const newTourist = await this.createTouristFromGoogle(googleUser);
        return newTourist;
      }
      return tourist;
    }

    if (role === 'AGENCY') {
      const agency = await this.agencyService.getAgencyByEmail(googleUser.email);
      console.log('google.sub', googleUser);
      console.log('agency', agency);
      if (!agency) {
        const newAgency = await this.createAgencyFromGoogle(googleUser);
        return newAgency;
      }
      return agency;
    }

    throw new HttpException('Invalid User Type', HttpStatus.BAD_REQUEST);
  }

  async getGoogleToken(code: string): Promise<string> {
    const { data } = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'post',
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
      },
    });
    return data.access_token;
  }

  async getGoogleUserData(token: string): Promise<IGoogleUser> {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
