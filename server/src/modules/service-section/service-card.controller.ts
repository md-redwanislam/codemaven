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

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { multerOptions } from '../../common/utils/multer';

import { CreateServiceCardDto } from './dto/create-service-card.dto';

import { UpdateServiceCardDto } from './dto/update-service-card';
import { ServiceCardService } from './service-card.service';

@Controller('admin/home/service-card')
@UseGuards(JwtAuthGuard)
export class ServiceCardController {
  constructor(private readonly serviceCardService: ServiceCardService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @Body() dto: CreateServiceCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serviceCardService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.serviceCardService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.serviceCardService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCardService.remove(id);
  }
}
