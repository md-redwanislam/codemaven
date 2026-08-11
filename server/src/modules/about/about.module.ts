import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../database/database.module';

import { AboutController } from './about.controller';
import { HeroService } from './hero.service';
import { MissionService } from './mission.service';
import { WorkProcessService } from './work-process.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [AboutController],

  providers: [HeroService, MissionService, WorkProcessService],

  exports: [HeroService, MissionService, WorkProcessService],
})
export class AboutModule {}
