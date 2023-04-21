import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Activa el modal de google y si la auth es correcta guarda la sesion en express-session
@Injectable()
export class GoogleTouristGuard extends AuthGuard('googleTourist') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    
    // Guarda la session llendo a Serializer
    await super.logIn(request);
    return activate;
  }
}
