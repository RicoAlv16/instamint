import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../Services/user.service';

@Controller('minter')
export class MinterController {
  constructor(private readonly minterService: UsersService) {}

  @UseGuards(JwtAuthGuard) 
  @Post('/activer-desactiver-2fa')
  async activerDesactiver2FA(@Request() req, @Body('enable2FA') enable2FA: boolean) {
    const userId = req.user.id; 
    await this.minterService.activerDesactiver2FA(userId, enable2FA);
    const message = enable2FA ? 'Authentification 2FA activée avec succès' : 'Authentification 2FA désactivée avec succès';
    return { message };
  }
  @UseGuards(JwtAuthGuard) 
  @Post('/changer-mot-de-passe')
  async changerMotDePasse(@Request() req, @Body() body: { nouveauMotDePasse: string }) {
    const userId = req.user.id;
    await this.minterService.changerMotDePasse(userId, body.nouveauMotDePasse);
    return { message: 'Mot de passe changé avec succès' };
  }
  @UseGuards(JwtAuthGuard) 
  @Post('/modifier-email')
  async modifierEmail(@Request() req, @Body('nouvelEmail') nouvelEmail: string) {
    const userId = req.user.id; 
    await this.minterService.modifierEmail(userId, nouvelEmail);
    return { message: 'E-mail modifié avec succès' };
  }
}
