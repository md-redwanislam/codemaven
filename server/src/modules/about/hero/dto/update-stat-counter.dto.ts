import { PartialType } from '@nestjs/mapped-types';

import { CreateStatCounterDto } from './create-stat-counter.dto';

export class UpdateStatCounterDto extends PartialType(CreateStatCounterDto) {}
