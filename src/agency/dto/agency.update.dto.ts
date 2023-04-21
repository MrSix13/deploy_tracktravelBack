import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class AgencyRegistrationDTO {
  @IsNotEmpty()
  name: string;

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
  phoneNumber: string;
}
