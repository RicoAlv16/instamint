import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsNumber } from "class-validator";

export class CreateTeaBagPostDto{

    @IsString()
    @ApiProperty({ type: String })
    username: string;

    @IsString()
    @ApiProperty({ type: String })
    bio: string;

    @IsString()
    @ApiProperty({ type: String })
    link: string;

    @IsString()
    @ApiProperty({ type: String })
    location: string;

    @IsNumber()
    @ApiProperty({ type: Number })
    followers: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    followered: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    cookNumber: number;

    @IsString()
    @ApiProperty({ type: String })
    whiteListe: string;

    @IsDate()
    @ApiProperty({ type: Date })
    whiteListeDate: Date;

    @IsNumber()
    @ApiProperty({ type: Number })
    idNft: number;
}