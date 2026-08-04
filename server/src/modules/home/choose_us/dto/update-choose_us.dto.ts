import { PartialType } from '@nestjs/mapped-types';
import { CreateChooseUsDto } from './create-choose_us.dto';

export class UpdateChooseUsDto extends PartialType(CreateChooseUsDto) {}
