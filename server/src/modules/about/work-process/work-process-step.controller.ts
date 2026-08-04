import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CreateWorkProcessStepDto } from './dto/create-work-process-step.dto';
import { UpdateWorkProcessStepDto } from './dto/update-work-process-step.dto';
import { WorkProcessStepService } from './work-process-step.service';

@Controller('admin/about/work-process/step')
@UseGuards(JwtAuthGuard)
export class WorkProcessStepController {
  constructor(
    private readonly workProcessStepService: WorkProcessStepService,
  ) {}

  @Post()
  create(@Body() dto: CreateWorkProcessStepDto) {
    return this.workProcessStepService.create(dto);
  }

  @Get()
  findAll() {
    return this.workProcessStepService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkProcessStepDto) {
    return this.workProcessStepService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workProcessStepService.remove(id);
  }
}
