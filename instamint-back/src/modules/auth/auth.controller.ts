import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMinterPostDto } from 'src/shared/dto/create-minter-post.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign')
  async createMinter(@Body() createMinterDto: CreateMinterPostDto) {
    return this.authService.createMinter(createMinterDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const token = this.authService.login(user);
    return { access_token: token, roles: user.roles };
  }
}
