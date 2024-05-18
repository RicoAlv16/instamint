import { IsNumber, IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdateMinterDto {
  @IsNumber()
  minterId: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password too weak' })
  password?: string;

  @IsOptional()
  @IsString()
  email?: string;
  
  @IsOptional()
  @IsString()
  pageLink?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
