import { IsString, IsInt, IsOptional, IsNumber, ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';
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

  @IsOptional()
  @IsString()
  rules: string;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @ArrayNotEmpty()
  @IsArray()
  sellPoints: SellPoint[];
  
  @IsOptional()
  @IsArray()
  poster_oldPhotos: Image[];
  
}
