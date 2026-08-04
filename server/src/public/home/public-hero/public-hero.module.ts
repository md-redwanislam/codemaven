import { Module } from '@nestjs/common';
import { HeroModule } from '../../../modules/home/hero/hero.module';
import { PublicHeroController } from './public-hero.controller';

@Module({
  imports: [HeroModule],
  controllers: [PublicHeroController],
})
export class PublicHeroModule {}
