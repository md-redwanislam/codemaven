import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../../database/database.module';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { HighlightCardController } from './highlight-card.controller';
import { HighlightCardService } from './highlight-card.service';
import { StatCounterController } from './stat-counter.controller';
import { StatCounterService } from './stat-counter.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [HeroController, StatCounterController, HighlightCardController],

  providers: [HeroService, StatCounterService, HighlightCardService],

  exports: [HeroService, StatCounterService, HighlightCardService],
})
export class AboutHeroModule {}
