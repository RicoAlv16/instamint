import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserDataModule } from './modules/update-minter-data/update-minter-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'instamint',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UpdateUserDataModule,
  ],
})
export class AppModule {}
