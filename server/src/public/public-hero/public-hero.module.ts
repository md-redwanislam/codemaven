import { Module } from '@nestjs/common';
import { PublicHeroService } from './public-hero.service';
import { PublicHeroController } from './public-hero.controller';

@Module({
  controllers: [PublicHeroController],
  providers: [PublicHeroService],
})
export class PublicHeroModule {}
