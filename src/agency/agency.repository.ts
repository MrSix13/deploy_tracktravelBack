import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../repository/base.repository';
import { Agency, AgencyDocument } from './schema/agency.schema';

@Injectable()
export class AgencyRepository extends BaseRepository<AgencyDocument> {
  constructor(@InjectModel(Agency.name) _agencyDocument: Model<AgencyDocument>) {
    super(_agencyDocument);
  }
}
