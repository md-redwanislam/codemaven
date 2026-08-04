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

import { HighlightCardService } from './highlight-card.service';

import { CreateHighlightCardDto } from './dto/create-highlight-card.dto';
import { UpdateHighlightCardDto } from './dto/update-highlight-card.dto';

@Controller('admin/about/highlight-card')
@UseGuards(JwtAuthGuard)
export class HighlightCardController {
  constructor(private readonly highlightCardService: HighlightCardService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  create(
    @Body() dto: CreateHighlightCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.highlightCardService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.highlightCardService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHighlightCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.highlightCardService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highlightCardService.remove(id);
  }
}
