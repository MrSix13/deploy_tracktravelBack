import { Injectable } from '@nestjs/common';
import { ResponsibleDocument } from 'src/responsible/schema/resposible.schema';
import { ResponsibleRepository } from './responsible.repository';

@Injectable()
export class ResponsibleService {
  constructor(private readonly _responsibleRepository: ResponsibleRepository) {}

  async validateUser(details: any): Promise<ResponsibleDocument> {
    return this._responsibleRepository.validateUser(details);
  }

  async findById(id: string): Promise<ResponsibleDocument> {
    const user = await this._responsibleRepository.findById(id);
    return user;
  }
}
