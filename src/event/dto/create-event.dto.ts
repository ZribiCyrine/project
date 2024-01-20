import { IsString, IsInt, IsOptional, IsNumber, ArrayNotEmpty, IsArray, IsNotEmpty, IsBoolean } from 'class-validator';
import { SellPoint } from '../../entities/sellPoint.entity';
import { Image } from '../../entities/image.entity';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @IsNotEmpty()
  @IsString()
  alcoholRules: string;

  @IsNotEmpty()
  @IsString()
  ageRules: string;

  @IsNotEmpty()
  @IsString()
  dressCode: string;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @ArrayNotEmpty()
  @IsArray()
  sellPoints: SellPoint[];
  
  @ArrayNotEmpty()
  @IsArray()
  poster_oldPhotos: Image[];

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;
  
}
