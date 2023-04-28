import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Seller } from './schema/seller.schema';
import { SellerRegistrationDto } from './dto/seller-registration.dto';
import { SellerRepository } from './seller.repository';

@Injectable()
export class SellerService {
  constructor(private readonly _sellerRepository: SellerRepository) {}

  async findById(id: string): Promise<Seller> {
    return this._sellerRepository.findById(id);
  }

  async findAll(): Promise<Seller[]> {
    return this._sellerRepository.findAll();
  }

  async create(sellerRegistrationDto: SellerRegistrationDto): Promise<Seller> {
    const { name, lastName, email, phoneNumber, password } = sellerRegistrationDto;

    const sellerWithEmail = await this._sellerRepository.findByEmail(email);
    if (sellerWithEmail) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdSeller = this._sellerRepository.create({
      name,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return createdSeller;
  }
}
