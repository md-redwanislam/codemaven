import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../../database/database.module';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MissionParagraphController } from './mission_paragraph.controller';
import { MissionParagraphService } from './mission_paragraph.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [MissionController, MissionParagraphController],

  providers: [MissionService, MissionParagraphService],

  exports: [MissionService, MissionParagraphService],
})
export class MissionModule {}
