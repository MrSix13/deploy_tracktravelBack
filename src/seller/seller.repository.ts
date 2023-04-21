import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/repository/base.repository';
import { Seller, SellerDocument } from './schema/seller.schema';

@Injectable()
export class SellerRepository extends BaseRepository<SellerDocument> {
  constructor(@InjectModel(Seller.name) _sellerDocument: Model<SellerDocument>) {
    super(_sellerDocument);
  }
}
