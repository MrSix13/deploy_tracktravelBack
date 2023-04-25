import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AgencyDocument } from './schema/agency.schema';
import { AgencyRegistrationDTO } from './dto/agency-register.dto';
import { AgencyRepository } from './agency.repository';

@Injectable()
export class AgencyService {
  constructor(private readonly _agencyRepository: AgencyRepository) {}

  async createAgency(agencyRegistrationDTO: AgencyRegistrationDTO): Promise<AgencyDocument> {
    const { name, email, password } = agencyRegistrationDTO;

    const agencyWithEmail = await this._agencyRepository.findOne({ email });
    if (agencyWithEmail) {
      throw new BadRequestException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAgency = this._agencyRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return createdAgency;
  } // POST a http://localhost:3000/agency/register con: { "name": "Agencia X", "email": "agenciaX@gmail.com", "password": "Carlos..14", "phoneNumber": "3002003344" }

  async getAgencyByGoogleId(googleId: string): Promise<AgencyDocument> {
    return this._agencyRepository.findOne({ googleId });
  }

  async getAgencyByEmail(email: string): Promise<AgencyDocument> {
    return this._agencyRepository.findOne({ email });
  }
}
