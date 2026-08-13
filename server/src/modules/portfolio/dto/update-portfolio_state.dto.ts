import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioStateDto } from './create-portfolio_state.dto';

export class UpdatePortfolioStateDto extends PartialType(
  CreatePortfolioStateDto,
) {}
