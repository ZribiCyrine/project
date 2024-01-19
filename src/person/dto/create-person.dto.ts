import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, isEnum, isString } from "class-validator";
import { Role } from "../../enum/role.enum";

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
