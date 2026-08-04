import { Module } from '@nestjs/common';

import { SolutionsSectionModule } from '../../../modules/home/solutions-section/solutions-section.module';
import { PublicSolutionsSectionController } from './public-solutions-section.controller';

@Module({
  imports: [SolutionsSectionModule],
  controllers: [PublicSolutionsSectionController],
})
export class PublicSolutionsSectionModule {}
