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
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('admin/home/hero')
@UseGuards(JwtAuthGuard)
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() dto: CreateHeroDto) {
    return this.heroService.create(dto);
  }

  @Get()
  findOne() {
    return this.heroService.findOne();
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
