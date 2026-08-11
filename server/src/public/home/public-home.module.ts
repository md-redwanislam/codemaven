import { Module } from '@nestjs/common';
import { HomeModule } from '../../modules/home/home.module';
import { PublicHomeController } from './public-home.controller';

@Module({
  imports: [HomeModule],
  controllers: [PublicHomeController],
})
export class PublicHomeModule {}
