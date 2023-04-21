import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { GoogleResponsibleGuard } from './utils/guardian.responsible.google.auth';


@Controller('responsible')
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Get("google")
  @UseGuards(GoogleResponsibleGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleResponsibleGuard)
  redirect(@Req() request, @Res() response: any) {
    const userAgent = request.headers['user-agent'];

    if (/mobile/i.test(userAgent)) {
      if (request.user) {
        return response.redirect(`${process.env.DEEP_LINK_CLIENT}myapp/Logged`);
      }
      return 'Not Authenticated';
    }
    return response.redirect(`${process.env.API_URL}/api/auth/google/status`);

  }

}
