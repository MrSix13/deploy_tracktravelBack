import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AgencyUserRegistrationDto {
  @IsNotEmpty()
  agencyUserId: string;

  @IsNotEmpty()
  @IsString()
  agencyUserName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\.\(\)\[\]\{\}\?\+\=\-\_\:\;\<\>\,\|\~]).{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial'
    }
  )
  password: string;

  // @IsNotEmpty()
  phoneNumber: string;

  // @IsNotEmpty()
  transportIds: string;

  // @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
