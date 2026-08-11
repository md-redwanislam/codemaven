import { Controller, Get } from '@nestjs/common';
import { PortfolioProjectService } from '../../modules/portfolio/portfolio_project.service';
import { PortfolioCategoryService } from './../../modules/portfolio/portfolio_category.service';

@Controller('portfolio')
export class PublicPortfolioController {
  constructor(
    private readonly PortfolioCategoryService: PortfolioCategoryService,
    private readonly PortfolioProjectService: PortfolioProjectService,
  ) {}

  @Get('category')
  findAllCategories() {
    return this.PortfolioCategoryService.findAll();
  }

  @Get('project')
  findAllProjects() {
    return this.PortfolioProjectService.findAll();
  }
}
