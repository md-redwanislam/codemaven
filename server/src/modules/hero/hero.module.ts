import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  imports: [DatabaseModule],

  controllers: [HeroController],

  providers: [HeroService],
})
export class HeroModule {}
