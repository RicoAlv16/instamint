import {
  Controller,
  Delete,
  Patch,
  UseGuards,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MinterAdminService } from './minter-admin.service';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(RolesGuard)
@ApiTags('admin')
export class AdminController {
  constructor(private minterAdminService: MinterAdminService) {}

  @Roles('admin')
  @Patch('/disable-minter/:id')
  @ApiOperation({ summary: 'Disable a minter account' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found. The specified minter does not exist.',
  })
  async disableMinter(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.minterAdminService.disableMinter(id);
    } catch (error) {
      throw new HttpException(
        'Failed to disable minter: ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Roles('admin')
  @Delete('/delete-minter/:id')
  @ApiOperation({ summary: 'Delete a minter account' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found. The specified minter does not exist.',
  })
  async deleteMinter(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.minterAdminService.deleteMinter(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete minter: ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
