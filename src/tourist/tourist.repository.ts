import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/repository/base.repository';
import { Tourist, TouristDocument } from './schema/tourist.schema';

@Injectable()
export class TouristRepository extends BaseRepository<TouristDocument> {
  // la conexion con la db se manda al constructror de baseRepository por super
  // agencyRepository tiene todos los metodos y atributos de BaseRepository
  constructor(@InjectModel(Tourist.name) _touristDocument: Model<TouristDocument>) {
    // aqui es el construtror por lo tanto aqui se heredan e inicializan todos los atributos de Base repository
    super(_touristDocument);
  }
}
