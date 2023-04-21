import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

/*
Dentro del {} de la class JwtAuthGuard, es donde doy los roles de los permisos, si es admin, superAdmin, manager, etc...
*/
