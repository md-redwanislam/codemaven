import { PartialType } from '@nestjs/mapped-types';
import { CreateAddFAQDto } from './create-add-faq.dto';

export class UpdateAddFAQDto extends PartialType(CreateAddFAQDto) {}
