import { IsEmail, IsNotEmpty } from 'class-validator';

export class TouristUpdateDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: number;
}
