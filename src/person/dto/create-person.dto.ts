import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePersonDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    firstname: string;
  
    @IsNotEmpty()
    @IsNumber()
    cin: number;
  
    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
