import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';

@Controller('minters-profile-with-nfts-list')
export class MintersProfileWithNftsListController {

    constructor ( private readonly mintersProfileWithNftsListService: MintersProfileWithNftsListService ) {}

    @Get('minter-nfts-list/:idMinter')
    async getNftsByMinter(@Param('idMinter') idMinter: number) {
        try {
            return this.mintersProfileWithNftsListService.getNftsByMinter(idMinter);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }

    @Get('teabag-nfts-list/:idTeaBag')
    async getNftsByTeaBag(@Param('idTeaBag') idTeaBag: number) {
        try {
            return this.mintersProfileWithNftsListService.getNftsByTeaBag(idTeaBag);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }
}

