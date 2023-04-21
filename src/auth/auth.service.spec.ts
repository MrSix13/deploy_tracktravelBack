import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceTourist } from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceTourist;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceTourist],
    }).compile();

    service = module.get<AuthServiceTourist>(AuthServiceTourist);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});