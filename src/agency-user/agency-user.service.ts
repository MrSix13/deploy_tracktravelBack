import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AgencyUser } from './schema/agency-user.schema';
import { AgencyUserRegistrationDto } from './dto/agency-user-registration.dto';
import { AgencyUserRepository } from './agency-user.repository';

@Injectable()
export class AgencyUserService {
  constructor(private readonly _agencyUserRepository: AgencyUserRepository) {}

  async findById(id: string): Promise<AgencyUser> {
    const agencyUser = await this._agencyUserRepository.findById(id);
    return agencyUser;
  }

  async findAll(): Promise<AgencyUser[]> {
    return this._agencyUserRepository.findAll();
  }

  async create(agencyUserRegistrationDto: AgencyUserRegistrationDto): Promise<AgencyUser> {
    const { agencyUserId, agencyUserName, email, password, phoneNumber, isActive } =
      agencyUserRegistrationDto;

    const touristWithEmail = await this._agencyUserRepository.findByEmail(email);
    console.log(touristWithEmail);
    if (touristWithEmail) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAgencyUser = this._agencyUserRepository.create({
      agencyUserId,
      agencyUserName,
      email,
      password: hashedPassword,
      phoneNumber,
      isActive
    });

    return createdAgencyUser;
  }
}
