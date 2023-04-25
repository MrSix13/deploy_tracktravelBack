import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class AgencyUserUpdateDto {
  @IsNotEmpty()
  @IsNumber()
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
        'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  transportIds: string;

  @IsNotEmpty()
  @IsNumber()
  roleId: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
