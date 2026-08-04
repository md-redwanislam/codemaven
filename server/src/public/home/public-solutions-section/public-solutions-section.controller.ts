import { Controller, Get } from '@nestjs/common';
import { IndustryCardService } from '../../../modules/home/solutions-section/industry-card.service';
import { SolutionsSectionService } from '../../../modules/home/solutions-section/solutions-section.service';

@Controller('home/solutions-section')
export class PublicSolutionsSectionController {
  constructor(
    private readonly solutionsSectionService: SolutionsSectionService,
    private readonly industryCardService: IndustryCardService,
  ) {}

  @Get()
  findAllSolutionsSection() {
    return this.solutionsSectionService.findAll();
  }

  @Get('cards')
  findAllCards() {
    return this.industryCardService.findAll();
  }
}
