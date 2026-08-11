import { Module } from '@nestjs/common';
import { AboutHeroModule } from '../../modules/about/hero/hero.module';
import { MissionModule } from '../../modules/about/mission/mission.module';
import { WorkProcessModule } from '../../modules/about/work-process/work-process.module';
import { PublicAboutController } from './public-about.controller';

@Module({
  imports: [AboutHeroModule, MissionModule, WorkProcessModule],
  controllers: [PublicAboutController],
})
export class PublicAboutModule {}
