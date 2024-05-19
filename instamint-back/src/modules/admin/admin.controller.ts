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
import { TeaBagAdminService } from './teabag-admin.service';
import { NftsAdminService } from './nfts-admin.service';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(RolesGuard)
@ApiTags('admin')
export class AdminController {
  constructor(
    private minterAdminService: MinterAdminService,
    private teabagAdminService: TeaBagAdminService,
    private nftsAdminService: NftsAdminService,
  ) {}

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

  @Roles('admin')
  @Delete('/delete-teabag/:id')
  @ApiOperation({ summary: 'Delete a tea bag' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found. The specified tea bag does not exist.',
  })
  async deleteTeaBag(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.teabagAdminService.deleteTeaBag(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete tea bag: ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Roles('admin')
  @Delete('/delete-nft/:id')
  @ApiOperation({ summary: 'Delete an NFT' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found. The specified NFT does not exist.',
  })
  async deleteNft(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.nftsAdminService.deleteNft(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete NFT: ' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
