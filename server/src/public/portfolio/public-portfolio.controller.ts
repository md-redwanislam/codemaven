import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from '../../modules/portfolio/portfolio.service';

@Controller('portfolio')
export class PublicPortfolioController {
  constructor(private readonly PortfolioService: PortfolioService) {}

  @Get('category')
  findAllCategories() {
    return this.PortfolioService.findAllCategories();
  }

  @Get('project')
  findAllProjects() {
    return this.PortfolioService.findAllProjects();
  }

  @Get('hero')
  findHero() {
    return this.PortfolioService.findHero();
  }

  @Get('showcase')
  findShowcase() {
    return this.PortfolioService.findShowcase();
  }

  @Get('state')
  findAllStates() {
    return this.PortfolioService.findAllStates();
  }
}
