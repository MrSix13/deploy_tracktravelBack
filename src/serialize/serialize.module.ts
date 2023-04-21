import { Module } from '@nestjs/common';
import { TouristModule } from 'src/tourist/tourist.module';
import { ResponsibleModule } from 'src/responsible/responsible.module';
import { GoogleSerializer } from './serialize.service';

@Module({
  imports: [TouristModule, ResponsibleModule],
  controllers: [],
  providers: [GoogleSerializer]
})
export class SerializerModule {}
