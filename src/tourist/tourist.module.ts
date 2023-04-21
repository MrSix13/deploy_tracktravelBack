import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TouristController } from './tourist.controller';
import { TouristRepository } from './tourist.repository';
import { Tourist, TouristSchema } from './schema/tourist.schema';
import { TouristService } from './tourist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tourist.name,
        schema: TouristSchema,
      },
    ]),
  ],
  controllers: [TouristController],
  providers: [TouristService, TouristRepository], // Registra TouristService como proveedor
})
export class TouristModule {}
