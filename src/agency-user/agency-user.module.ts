import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgencyService } from 'src/agency/agency.service';
import { AgencyUserController } from './agency-user.controller';
import { AgencyUserService } from './agency-user.service';
import { AgencyUserRepository } from './agency-user.repository';
import { AgencyUser, AgencyUserSchema } from './schema/agency-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AgencyUser.name,
        schema: AgencyUserSchema,
      },
    ]),
  ],
  controllers: [AgencyUserController],
  providers: [AgencyUserService, AgencyService, AgencyUserRepository],
})
export class AgencyUserModule {}
