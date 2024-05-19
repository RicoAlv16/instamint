import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNftsPostDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;

    @IsString()
    @ApiProperty({ type: String })
    hashtag: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    description: string;

    @IsString()
    @ApiProperty({ type: String })
    location: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    picture: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: Number })
    price: number;

    @IsString()
    @ApiProperty({ type: String })
    link: string;

    @IsString()
    @ApiProperty({ type: Number })
    mintNumber: number;

    @IsString()
    @ApiProperty({ type: Number })
    dismintNumber: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: Boolean })
    isBuyable: boolean;

    @IsString()
    @ApiProperty({ type: Number })
    idComment: number;
}