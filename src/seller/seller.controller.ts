import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
    InternalServerErrorException
  } from '@nestjs/common';
  import { SellerService } from './seller.service';
  import { SellerRegistrationDto } from './dto/seller-registration.dto';
  import { Seller } from './schema/seller.schema';
  
  @Controller('seller')
  export class SellerController {
    constructor(private readonly sellerService: SellerService) {}
  
    @Get()
    async findAll(): Promise<Seller[]> {
      try {
        return await this.sellerService.findAll();
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch all seller');
      }
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      try {
        const seller = await this.sellerService.findById(id);
        if (!seller) {
          throw new NotFoundException(`Seller with ID ${id} not found`);
        }
        return seller;
      } catch (err) {
        throw new NotFoundException(`Seller with ID ${id} not found`);
      }
    }
  
    @Post('/register')
    async create(@Body() sellerRegistrationDto: SellerRegistrationDto) {
      try {
        const result = await this.sellerService.create(sellerRegistrationDto);
        return result;
      } catch (error) {
        throw new NotFoundException(`The seller could not be created`);
      }
    }
  }
  