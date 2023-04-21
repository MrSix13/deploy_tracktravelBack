import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Tourist } from './schema/tourist.schema';
import { TouristRegistrationDTO } from './dto/tourist-registration.dto';
// import { TouristUpdateDto } from './dto/tourist-update.dto';
import { TouristRepository } from './tourist.repository';

@Injectable()
export class TouristService {
  constructor(private readonly _touristRepository: TouristRepository) {}

  async findById(id: string): Promise<Tourist> {
    const tourist = await this._touristRepository.findById(id);
    return tourist;
  }

  async findAll(): Promise<Tourist[]> {
    return this._touristRepository.findAll();
  }

  async create(TouristRegistrationDTOs: TouristRegistrationDTO): Promise<Tourist> {
    const { firstName, lastName, email, phoneNumber, password } = TouristRegistrationDTOs;

    const touristWithEmail = await this._touristRepository.findByEmail(email);
    console.log(touristWithEmail);
    if (touristWithEmail) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdTourist = this._touristRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return createdTourist;
  }

  async getTouristByGoogleId(googleId: string): Promise<TouristRegistrationDTO> {
    return this._touristRepository.findOne({ googleId });
  }

  // POST a http://localhost:3000/tourist/register con: { "firstName": "Carlos", "lastName": "Reyes", "email": "carlos@gmail.com", "password": "Carlos..14", "phoneNumber": "3002003344" }

  // async update(id: string, updateDto: TouristUpdateDto): Promise<Tourist> {
  //     const { firstName, lastName, email, phoneNumber } = updateDto;
  //     console.log({ firstName, lastName, email, phoneNumber })
  //     if (!firstName || !lastName || !email || !phoneNumber) {
  //         throw new BadRequestException('Missing data');
  //     }

  //     const existingTourist = await this._touristRepository.findById(id);
  //     if (!existingTourist) {
  //         throw new NotFoundException('Tourist not found');
  //     }

  //     existingTourist.firstName = firstName;
  //     existingTourist.lastName = lastName;
  //     existingTourist.email = email;

  //     return existingTourist.save();
  // }

  // async delete(id: string): Promise<Tourist> {
  //     const tourist = await this._touristRepository.findById(id);
  //     if (!tourist) {
  //         throw new NotFoundException('Tourist not found');
  //     }
  //     return await tourist.deleteOne();
  // }
}
