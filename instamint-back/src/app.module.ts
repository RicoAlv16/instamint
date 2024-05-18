import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UpdateUserDataModule } from './modules/update-minter-data/update-minter-data.module';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

// Créer un type pour les options de configuration de TypeORM
type CustomTypeOrmModuleOptions = TypeOrmModuleOptions & {
  type: 'custom' | 'another_custom' | 'etc';
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // Cast nécessaire car process.env.DB_TYPE est une string
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    } as CustomTypeOrmModuleOptions), // Utilisation de l'assertion de type pour convertir les options
    UpdateUserDataModule,
  ],
})
export class AppModule {}
