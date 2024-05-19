import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateMinterPostDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    password: string;

    @IsString()
    @ApiProperty({ type: String })
    username: string;

    @IsString()
    @ApiProperty({ type: String })
    phone: string;

    @IsString()
    @ApiProperty({ type: String })
    location: string;

    @IsString()
    @ApiProperty({ type: String })
    profilBio: string;

    @IsString()
    @ApiProperty({ type: String })
    profilPicture: string;

    @IsString()
    @ApiProperty({ type: String })
    role: string;

    @IsString()
    @ApiProperty({ type: String })
    profilPrivate: string;

    @IsString()
    @ApiProperty({ type: String })
    profilLink: string;

    @IsNumber()
    @ApiProperty({ type: Number })
    followers: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    followered: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    idTeaBag: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    idNft: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    idReport: number;
}