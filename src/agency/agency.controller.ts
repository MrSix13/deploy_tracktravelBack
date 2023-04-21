import { Controller } from '@nestjs/common';
// import mongoose from 'mongoose';
import { AgencyService } from './agency.service';
// import { AgencyRegistrationDTO } from './dto/agency.dto';
// import { Agency } from './schema/agency.schema';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  //   @Post('/register')
  //   async create(@Body() agencyRegistrationDto: AgencyRegistrationDTO) {
  //     try {
  //       const result = await this.agencyService.createAgency(AgencyRegistrationDTO);
  //       return result;
  //     } catch (error) {
  //       throw new NotFoundException(`The tourist could not be created`);
  //     }
  //   }
}
