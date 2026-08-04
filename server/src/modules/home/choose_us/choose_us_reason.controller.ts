import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { multerOptions } from '../../../common/utils/multer';
import { ChooseUsReasonService } from './choose_us_reason.service';
import { CreateChooseUsReasonDto } from './dto/create-choose_us_reason.dto';
import { UpdateChooseUsReasonDto } from './dto/update-choose_us_reason.dto';

@Controller('admin/home/choose-us/reason')
@UseGuards(JwtAuthGuard)
export class ChooseUsReasonController {
  constructor(private readonly chooseUsReasonService: ChooseUsReasonService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  create(
    @Body() dto: CreateChooseUsReasonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.chooseUsReasonService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.chooseUsReasonService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateChooseUsReasonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.chooseUsReasonService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chooseUsReasonService.remove(id);
  }
}
