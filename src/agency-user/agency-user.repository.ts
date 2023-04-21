import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/repository/base.repository';
import { AgencyUser, AgencyUserDocument } from './schema/agency-user.schema';

@Injectable()
export class AgencyUserRepository extends BaseRepository<AgencyUserDocument> {
  constructor(@InjectModel(AgencyUser.name) _touristDocument: Model<AgencyUserDocument>) {
    super(_touristDocument);
  }
}
