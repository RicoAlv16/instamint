import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchNftModule } from './modules/search-nft/searchNft.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NftsEntity } from './shared/entities/nfts.entity';
import { SearchMinterModule } from './modules/search-minter/search-minter.module';
import { NotificationsModule } from './modules/notifications/notifications/notifications.module';
import { UsersProfileModule } from './modules/social-features-single-minter/users-profile/users-profile.module';
import { MintersProfileWithNftsListModule } from './modules/social-features-single-minter/minters-profile-with-nfts-list/minters-profile-with-nfts-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [NftsEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    SearchNftModule,
    SearchMinterModule,
    NotificationsModule,
    UsersProfileModule,
    MintersProfileWithNftsListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
