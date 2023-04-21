import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { AgencyUserService } from './agency-user.service';
import { AgencyUserRegistrationDto } from './dto/agency-user-registration.dto';
import { AgencyUser } from './schema/agency-user.schema';

@Controller('agencyUser')
export class AgencyUserController {
  constructor(private readonly agencyUserService: AgencyUserService) {}

  @Get()
  async findAll(): Promise<AgencyUser[]> {
    try {
      return await this.agencyUserService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch all agencyUser');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const agencyUser = await this.agencyUserService.findById(id);
      if (!agencyUser) {
        throw new NotFoundException(`AgencyUser with ID ${id} not found`);
      }
      return agencyUser;
    } catch (err) {
      throw new NotFoundException(`AgencyUser with ID ${id} not found`);
    }
  }

  @Post('/register')
  async create(@Body() agencyUserRegistrationDto: AgencyUserRegistrationDto) {
    try {
      const result = await this.agencyUserService.create(agencyUserRegistrationDto);
      return result;
    } catch (error) {
      throw new NotFoundException(`The agencyUser could not be created`);
    }
  }
}
