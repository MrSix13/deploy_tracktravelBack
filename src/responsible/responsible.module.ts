import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { ResponsibleController } from './responsible.controller';
import { ResponsibleService } from './responsible.service';
import { Responsible, ResponsibleSchema } from './schema/resposible.schema';
import { ResponsibleRepository } from './responsible.repository';
import { GoogleResponsibleGuard } from './utils/guardian.responsible.google.auth';
import { GoogleResponsibleStrategy } from './strategy/responsible.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Responsible.name,
        schema: ResponsibleSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'googleResponsible' }),
  ],
  controllers: [ResponsibleController],
  providers: [
    ResponsibleService,
    ResponsibleRepository,
    GoogleResponsibleStrategy,
    GoogleResponsibleGuard,
  ],

  exports: [ResponsibleService],
})
export class ResponsibleModule {}
