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

import { CreateServiceSectionDto } from './dto/create-service-section.dto';
import { UpdateServiceSectionDto } from './dto/update-service-section.dto';
import { ServiceSectionService } from './service-section.service';

@Controller('admin/home/service-section')
@UseGuards(JwtAuthGuard)
export class ServiceSectionController {
  constructor(private readonly serviceSectionService: ServiceSectionService) {}

  @Post()
  create(@Body() dto: CreateServiceSectionDto) {
    return this.serviceSectionService.create(dto);
  }

  @Get()
  findAll() {
    return this.serviceSectionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceSectionDto) {
    return this.serviceSectionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceSectionService.remove(id);
  }
}
