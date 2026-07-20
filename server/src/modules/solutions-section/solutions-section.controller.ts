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

import { CreateSolutionsSectionDto } from './dto/create-solutions-section.dto';
import { UpdateSolutionsSectionDto } from './dto/update-solutions-section.dto';
import { SolutionsSectionService } from './solutions-section.service';

@Controller('admin/home/solution-section')
@UseGuards(JwtAuthGuard)
export class SolutionsSectionController {
  constructor(
    private readonly solutionsSectionService: SolutionsSectionService,
  ) {}

  @Post()
  create(@Body() dto: CreateSolutionsSectionDto) {
    return this.solutionsSectionService.create(dto);
  }

  @Get()
  findAll() {
    return this.solutionsSectionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSolutionsSectionDto) {
    return this.solutionsSectionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsSectionService.remove(id);
  }
}
