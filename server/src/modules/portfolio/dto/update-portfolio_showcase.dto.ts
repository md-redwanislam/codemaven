import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioShowcaseDto } from './create-portfolio_showcase.dto';

export class UpdatePortfolioShowcaseDto extends PartialType(
  CreatePortfolioShowcaseDto,
) {}
