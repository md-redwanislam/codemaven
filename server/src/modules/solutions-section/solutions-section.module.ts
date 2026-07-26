import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { IndustryCardController } from './industry-card.controller';
import { IndustryCardService } from './industry-card.service';
import { SolutionsSectionController } from './solutions-section.controller';
import { SolutionsSectionService } from './solutions-section.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [SolutionsSectionController, IndustryCardController],

  providers: [SolutionsSectionService, IndustryCardService],
})
export class SolutionsSectionModule {}
