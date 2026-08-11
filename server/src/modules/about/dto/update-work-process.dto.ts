import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkProcessDto } from './create-work-process.dto';

export class UpdateWorkProcessDto extends PartialType(CreateWorkProcessDto) {}
