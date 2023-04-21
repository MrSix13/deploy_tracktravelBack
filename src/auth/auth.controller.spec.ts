import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllerTourist } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthControllerTourist;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerTourist],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthControllerTourist>(AuthControllerTourist);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
