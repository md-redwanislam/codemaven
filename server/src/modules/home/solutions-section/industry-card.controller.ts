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

import { CreateIndustryCardDto } from './dto/create-industry-card.dto';
import { UpdateIndustryCardDto } from './dto/update-industry-card';
import { IndustryCardService } from './industry-card.service';

@Controller('admin/home/industry-card')
@UseGuards(JwtAuthGuard)
export class IndustryCardController {
  constructor(private readonly industryCardService: IndustryCardService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @Body() dto: CreateIndustryCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.industryCardService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.industryCardService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIndustryCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.industryCardService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.industryCardService.remove(id);
  }
}
