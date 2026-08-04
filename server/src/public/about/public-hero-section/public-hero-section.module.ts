import { Module } from '@nestjs/common';
import { AboutHeroModule } from '../../../modules/about/hero/hero.module';
import { PublicHeroSectionController } from './public-hero-section.controller';

@Module({
  imports: [AboutHeroModule],
  controllers: [PublicHeroSectionController],
})
export class PublicHeroSectionModule {}
