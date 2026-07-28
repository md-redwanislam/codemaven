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

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { StatisticService } from './statistic.service';

@Controller('admin/home/statistic')
@UseGuards(JwtAuthGuard)
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post()
  create(@Body() dto: CreateStatisticDto) {
    return this.statisticService.create(dto);
  }

  @Get()
  findAll() {
    return this.statisticService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStatisticDto) {
    return this.statisticService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticService.remove(id);
  }
}
