import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TouristService } from 'src/tourist/tourist.service';
import { ResponsibleService } from 'src/responsible/responsible.service';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(
    private readonly touristService: TouristService,
    private readonly responsibleService: ResponsibleService
  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    let user;
    if (payload.role === 'tourist') {
      user = await this.touristService.findById(payload._id);
    } else if (payload.role === 'responsible') {
      user = await this.responsibleService.findById(payload._id);
    }
    return user ? done(null, user) : done(null, null);
  }
}
