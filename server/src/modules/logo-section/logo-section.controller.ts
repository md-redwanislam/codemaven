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

import { CreateLogoSectionDto } from './dto/create-logo-section.dto';
import { UpdateLogoSectionDto } from './dto/update-logo-section.dto';
import { LogoSectionService } from './logo-section.service';

@Controller('admin/home/logo-section')
@UseGuards(JwtAuthGuard)
export class LogoSectionController {
  constructor(private readonly logoSectionService: LogoSectionService) {}

  @Post()
  create(@Body() dto: CreateLogoSectionDto) {
    return this.logoSectionService.create(dto);
  }

  @Get()
  findAll() {
    return this.logoSectionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLogoSectionDto) {
    return this.logoSectionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logoSectionService.remove(id);
  }
}
