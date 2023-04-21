import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/repository/base.repository';
import { ResponsibleDocument, Responsible } from './schema/resposible.schema';

@Injectable()
export class ResponsibleRepository extends BaseRepository<ResponsibleDocument> {
  constructor(@InjectModel(Responsible.name) _responsibleModel: Model<ResponsibleDocument>) {
    super(_responsibleModel);
  }
}
