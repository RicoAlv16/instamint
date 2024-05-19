import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { UpdateUserDataService } from './update-minter-data.service';
import { UpdateMinterDto } from '../../shared/dto/update-minter-data.dto';

@Controller('modules/update-user-data')
export class UpdateUserDataController {
  constructor(private readonly updateUserDataService: UpdateUserDataService) {}

  @Put()
  async updateUser(@Body() updateMinterDto: UpdateMinterDto) {
    return this.updateUserDataService.updateUser(updateMinterDto);
  }
}