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
import { ContactSectionService } from './contact-section.service';
import { CreateContactSectionDto } from './dto/create-contact-section.dto';
import { UpdateContactSectionDto } from './dto/update-contact-section.dto';

@Controller('admin/home/contact-section')
@UseGuards(JwtAuthGuard)
export class ContactSectionController {
  constructor(private readonly contactSectionService: ContactSectionService) {}

  @Post()
  create(@Body() dto: CreateContactSectionDto) {
    return this.contactSectionService.create(dto);
  }

  @Get()
  findAll() {
    return this.contactSectionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContactSectionDto) {
    return this.contactSectionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactSectionService.remove(id);
  }
}
