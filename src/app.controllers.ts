import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import { IsString, IsOptional } from 'class-validator';
import { Response } from 'express';

class QueryRolDto {
  @IsString()
  @IsOptional()
  readonly role?: string;
}

@Controller('api/auth/google')
export class AppController {
  @Get('/')
  async authGoogle(@Res() response: Response, @Query() query: QueryRolDto) {
    if (query?.role === 'responsible') {
      response.redirect(`${process.env.API_URL}/responsible/google`);
    } else if (query?.role === 'tourist') {
      response.redirect(`${process.env.API_URL}/tourist/google`);
    } else {
      response.status(400).json({ message: 'Role Invalid' });
    }
  }

  @Get('status')
  async authGoogleStatus(@Req() request: Request & { user: any }) {
    if (request.user) return request.user;
    return 'Not Authenticated';
  }

  @Get("logout")
  async logoutGoogle(@Req() request, @Res() response: Response,){
     request.session.destroy()
     response.status(201).json({ message: 'sesion eliminada' });
  }
}
