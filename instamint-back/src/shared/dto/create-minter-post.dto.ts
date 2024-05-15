import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateMinterPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: '' })
  phone?: string = '';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: '' })
  location?: string = '';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: 'Your bio' })
  profilBio?: string = 'Your bio';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: '' })
  profilPicture?: string = '';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: 'user' })
  roles?: string = 'user';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: 'false' })
  profilPrivate?: string = 'false';

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: '' })
  profilLink?: string = '';

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  followers?: number = 0;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  followered?: number = 0;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  idTeaBag?: number = 0;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  idNft?: number = 0;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  idReport?: number = 0;
}
