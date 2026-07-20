import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { SolutionsSectionController } from './solutions-section.controller';
import { SolutionsSectionService } from './solutions-section.service';

@Module({
  imports: [DatabaseModule],

  controllers: [SolutionsSectionController],

  providers: [SolutionsSectionService],
})
export class SolutionsSectionModule {}
