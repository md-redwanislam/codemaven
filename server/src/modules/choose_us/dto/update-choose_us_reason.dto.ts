import { PartialType } from '@nestjs/mapped-types';

import { CreateChooseUsReasonDto } from './create-choose_us_reason.dto';

export class UpdateChooseUsReasonDto extends PartialType(
  CreateChooseUsReasonDto,
) {}
