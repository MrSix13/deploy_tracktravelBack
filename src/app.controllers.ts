import { Controller, Get, Query, Res, Req, HttpStatus } from '@nestjs/common';
import { IsString, IsOptional } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { GoogleAuthService } from './auth/google.service';

interface IMyRequest extends Request {
  params: {
    token: string;
  };
}
class QueryRolDto {
  @IsString()
  @IsOptional()
  readonly role?: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/api/auth/google')
  async auth(@Query() query: QueryRolDto, @Res() res: Response) {
    const authUrl = await this.googleAuthService.generateGoogleAuthUrl(query.role);
    res.redirect(authUrl);
  }

  @Get('/api/auth/google/callback')
  async authGoogle(@Query('state') role: string, @Res() response: Response) {
    try {
      // Obtenemos el token de acceso de Google
      const code = response.req.query.code as string;

      const token = await this.googleAuthService.getGoogleToken(code);

      // // Obtenemos los datos del usuario autenticado en Google
      const googleUser = await this.googleAuthService.getGoogleUserData(token);

      // // Validamos el usuario y obtenemos el DTO correspondiente
      const userDTO = await this.googleAuthService.validateGoogleUser(googleUser, role);
      // Creamos un JWT para el usuario, aqui definimos los datos que se enviaran al front
      const payload = { sub: userDTO.email, role };
      const tokenJWT = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

      // // Redirigimos al usuario a la URL deseada con el JWT
      console.log('link', `${process.env.API_URL}/home/${tokenJWT}`);
      response.redirect(`${process.env.API_URL}/home/${tokenJWT}`);
    } catch (error) {
      console.error(error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get('/home/:token')
  async authGoogleStatus(@Req() request: IMyRequest & { user: any }, @Res() response: Response) {
    const { token } = request.params;
    response.json({ token, message: 'Successfully authenticated' });
  }

  @Get('logout')
  async logoutGoogle(@Req() request, @Res() response: Response) {
    request.session.destroy();
    response.status(201).json({ message: 'sesion eliminada' });
  }
}
