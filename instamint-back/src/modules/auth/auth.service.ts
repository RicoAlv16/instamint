import { InjectRepository } from '@nestjs/typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateMinterPostDto } from 'src/shared/dto/create-minter-post.dto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MinterEntity)
    private minterRepository: Repository<MinterEntity>,
    private jwtService: JwtService
  ) {}

  async createMinter(
    createMinterDto: CreateMinterPostDto
  ): Promise<MinterEntity> {
    const hashedPassword = await bcrypt.hash(createMinterDto.password, 10);

    const minter = this.minterRepository.create({
      ...createMinterDto,
      password: hashedPassword,
    });
    return this.minterRepository.save(minter);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.minterRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
