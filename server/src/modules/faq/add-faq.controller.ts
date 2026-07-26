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

import { JwtAuthGuard } from './../../common/guards/jwt-auth.guard';
import { AddFaqService } from './add-faq.service';
import { CreateAddFAQDto } from './dto/create-add-faq.dto';
import { UpdateAddFAQDto } from './dto/update-add-faq.dto';

@Controller('admin/home/add-faq')
@UseGuards(JwtAuthGuard)
export class AddFaqController {
  constructor(private readonly addFaqService: AddFaqService) {}

  @Post()
  create(@Body() dto: CreateAddFAQDto) {
    return this.addFaqService.create(dto);
  }

  @Get()
  findAll() {
    return this.addFaqService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAddFAQDto) {
    return this.addFaqService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addFaqService.remove(id);
  }
}
