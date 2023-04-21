import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerRepository } from './seller.repository';
import { Seller, SellerSchema } from './schema/seller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seller.name,
        schema: SellerSchema,
      },
    ]),
  ],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
