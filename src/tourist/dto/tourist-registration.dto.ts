import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class TouristRegistrationDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\.\(\)\[\]\{\}\?\+\=\-\_\:\;\<\>\,\|\~]).{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial',
    },
  )
  password: string;

  googleId: string;
}
