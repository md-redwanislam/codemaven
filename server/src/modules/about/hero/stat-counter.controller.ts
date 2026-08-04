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

import { CreateStatCounterDto } from './dto/create-stat-counter.dto';
import { UpdateStatCounterDto } from './dto/update-stat-counter.dto';
import { StatCounterService } from './stat-counter.service';

@Controller('admin/about/stat-counter')
@UseGuards(JwtAuthGuard)
export class StatCounterController {
  constructor(private readonly statCounterService: StatCounterService) {}

  @Post()
  create(@Body() dto: CreateStatCounterDto) {
    return this.statCounterService.create(dto);
  }

  @Get()
  findAll() {
    return this.statCounterService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStatCounterDto) {
    return this.statCounterService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statCounterService.remove(id);
  }
}
