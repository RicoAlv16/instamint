import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersProfileService } from './users-profile.service';

@Controller('users-profile')
export class UsersProfileController {
    constructor( private usersProfileService: UsersProfileService){}

    
    @Get('/all-minters')
    getAllMinters() {
        return this.usersProfileService.getAllMinters()
    }

    @Get('/all-teabags')
    getAllTeaBags() {
        return this.usersProfileService.getAllTeaBags()
    }
    
    @Get('user/:idMinter')
    getTeaBagByMinter(@Param('idMinter') idMinter: number) {
        try{
            return this.usersProfileService.getTeaBagByMinter(idMinter);
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
}
