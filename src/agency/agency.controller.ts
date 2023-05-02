import { Controller, NotFoundException, Body, Post } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyRegistrationDTO } from './dto/agency-register.dto';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post('/register')
  async create(@Body() agencyRegistrationDto: AgencyRegistrationDTO) {
    try {
      const result = await this.agencyService.createAgency(agencyRegistrationDto);
      return result;
    } catch (error) {
      throw new NotFoundException(`The tourist could not be created`);
    }
  }
}
