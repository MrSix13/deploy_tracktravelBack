import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createTouristFromGoogle(googleUser: IGoogleUser): Promise<TouristRegistrationDTO> {
    const tourist: TouristRegistrationDTO = await this.turistService.create({
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      email: googleUser.email,
      googleId: googleUser.sub,
      password: googleUser.email,
      phoneNumber: '000000',
    });
    return tourist;
  }

  async createAgencyFromGoogle(googleUser: IGoogleUser): Promise<AgencyRegistrationDTO> {
    const agency: AgencyRegistrationDTO = await this.agencyService.createAgency({
      name: googleUser.given_name,
      email: googleUser.email,
      cnpj: '000000000',
      responsable: googleUser.given_name,
      password: googleUser.email,
    });
    return agency;
  }

  async validateGoogleUser(
    googleUser: IGoogleUser,
    userType,
  ): Promise<AgencyRegistrationDTO | TouristRegistrationDTO> {
    if (userType === 'TOURIST') {
      // tourist servide
      return this.turistService.getTouristByGoogleId(googleUser.sub);
    }
    if (userType === 'AGENCY') {
      return this.agencyService.getAgencyByGoogleId(googleUser.sub);
    }
    throw new HttpException('Invalid User Type', HttpStatus.BAD_REQUEST);
  }
}
