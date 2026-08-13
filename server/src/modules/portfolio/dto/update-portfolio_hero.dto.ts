import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioHeroDto } from './create-portfolio_hero.dto';

export class UpdatePortfolioHeroDto extends PartialType(
  CreatePortfolioHeroDto,
) {}
