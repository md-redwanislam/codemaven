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
import { CreateWorkProcessDto } from './dto/create-work-process.dto';
import { UpdateWorkProcessDto } from './dto/update-work-process.dto';
import { WorkProcessService } from './work-process.service';

@Controller('admin/about/work-process')
@UseGuards(JwtAuthGuard)
export class WorkProcessController {
  constructor(private readonly workProcessService: WorkProcessService) {}

  @Post()
  create(@Body() dto: CreateWorkProcessDto) {
    return this.workProcessService.create(dto);
  }

  @Get()
  findAll() {
    return this.workProcessService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkProcessDto) {
    return this.workProcessService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workProcessService.remove(id);
  }
}
