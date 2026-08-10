import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioCategoryDto } from './create-portfolio_category.dto';

export class UpdatePortfolioCategoryDto extends PartialType(
  CreatePortfolioCategoryDto,
) {}
