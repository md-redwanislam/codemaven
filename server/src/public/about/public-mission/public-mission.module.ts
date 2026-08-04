import { Module } from '@nestjs/common';
import { MissionModule } from '../../../modules/about/mission/mission.module';
import { PublicMissionController } from './public-mission.controller';

@Module({
  imports: [MissionModule],
  controllers: [PublicMissionController],
})
export class PublicMissionModule {}
