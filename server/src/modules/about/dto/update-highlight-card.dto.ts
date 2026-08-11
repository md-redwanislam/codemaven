import { PartialType } from '@nestjs/mapped-types';

import { CreateHighlightCardDto } from './create-highlight-card.dto';

export class UpdateHighlightCardDto extends PartialType(
  CreateHighlightCardDto,
) {}
