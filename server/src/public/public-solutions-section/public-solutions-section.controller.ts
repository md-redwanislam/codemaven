import { Controller, Get } from '@nestjs/common';
import { IndustryCardService } from '../../modules/solutions-section/industry-card.service';
import { SolutionsSectionService } from '../../modules/solutions-section/solutions-section.service';

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
