import { IsString, IsNotEmpty } from 'class-validator';

export class AgencyRegistrationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  responsable: string;
}
