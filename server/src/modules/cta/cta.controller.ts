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

import { CtaService } from './cta.service';
import { CreateCtaDto } from './dto/create-cta.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';

@Controller('admin/home/cta')
@UseGuards(JwtAuthGuard)
export class CtaController {
  constructor(private readonly ctaService: CtaService) {}

  @Post()
  create(@Body() dto: CreateCtaDto) {
    return this.ctaService.create(dto);
  }

  @Get()
  findOne() {
    return this.ctaService.findOne();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCtaDto) {
    return this.ctaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ctaService.remove(id);
  }
}
