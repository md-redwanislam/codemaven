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

import { HeroService } from './hero.service';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('admin/about/hero-section')
@UseGuards(JwtAuthGuard)
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() dto: CreateHeroDto) {
    return this.heroService.create(dto);
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHeroDto) {
    return this.heroService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(id);
  }
}
