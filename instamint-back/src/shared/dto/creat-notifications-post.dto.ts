import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsNumber } from "class-validator";

export class CreateNotificationsPostDto{

    @IsNumber()
    @ApiProperty({ type: Number })
    idMinter: number;

    @IsNumber()
    @ApiProperty({ type: Number })
    idNft: number;

    @IsString()
    @ApiProperty({ type: String })
    activities: string;

    @IsString()
    @ApiProperty({ type: String })
    type: string;

    @IsString()
    @ApiProperty({ type: String })
    link: string;

    @IsString()
    @ApiProperty({ type: String })
    status: string;

    @IsDate()
    @ApiProperty({ type: Date })
    notifDate: Date;

}