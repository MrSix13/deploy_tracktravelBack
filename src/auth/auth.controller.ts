import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-touris-auth.dto';

@Controller('login')
export class AuthControllerTourist {
  constructor(private readonly authService: AuthService) {}

  // @Post('/loginTourist')
  async loginTourist(@Body() touristObjectLogin: LoginAuthDto) {
    const data = await this.authService.login(touristObjectLogin, 'tourist');
    return data;
  }

  // @Post('/agency')
  async loginAgency(@Body() agencyObjectLogin: LoginAuthDto) {
    const data = await this.authService.login(agencyObjectLogin, 'agency');
    return data;
  }

  // //Login Tourist
  // @Post('tourist')
  // loginUserTourist(@Body() touristObjectLogin: LoginAuthDto) {
  //     return this.authService.tourist(touristObjectLogin);
  // }

  // //Login Agency
  // @Post('agency')
  // loginUserAgency(@Body() agencyObjectLogin: LoginAuthDto) {
  //     return this.authService.agency(agencyObjectLogin);
  // }
}
