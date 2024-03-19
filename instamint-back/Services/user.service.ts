import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async activerDesactiver2FA(userId: number, enable2FA: boolean): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    user.twoFactorAuthEnabled = enable2FA;
    await this.userRepository.save(user);
  }
  
  async changerMotDePasse(userId: number, nouveauMotDePasse: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10); // Hasher le nouveau mot de passe
    user.password = hashedPassword;
    await this.userRepository.save(user);
  }
  async modifierEmail(userId: number, nouvelEmail: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    user.email = nouvelEmail;
    await this.userRepository.save(user);
  }
}