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
import { ChooseUsService } from './choose_us.service';
import { CreateChooseUsDto } from './dto/create-choose_us.dto';
import { UpdateChooseUsDto } from './dto/update-choose_us.dto';

@Controller('admin/home/choose-us')
@UseGuards(JwtAuthGuard)
export class ChooseUsController {
  constructor(private readonly chooseUsService: ChooseUsService) {}

  @Post()
  create(@Body() dto: CreateChooseUsDto) {
    return this.chooseUsService.create(dto);
  }

  @Get()
  findAll() {
    return this.chooseUsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChooseUsDto) {
    return this.chooseUsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chooseUsService.remove(id);
  }
}
