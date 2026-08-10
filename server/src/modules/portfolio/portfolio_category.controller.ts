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
import { CreatePortfolioCategoryDto } from './dto/create-portfolio_category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio_category.dto';
import { PortfolioCategoryService } from './portfolio_category.service';

@Controller('admin/portfolio/category')
@UseGuards(JwtAuthGuard)
export class PortfolioCategoryController {
  constructor(
    private readonly portfolioCategoryService: PortfolioCategoryService,
  ) {}

  @Post()
  create(@Body() dto: CreatePortfolioCategoryDto) {
    return this.portfolioCategoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.portfolioCategoryService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePortfolioCategoryDto) {
    return this.portfolioCategoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioCategoryService.remove(id);
  }
}
