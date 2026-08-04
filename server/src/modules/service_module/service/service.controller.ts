import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { multerOptions } from '../../../common/utils/multer';
import { CreateServiceModuleSectionDto } from './dto/create-service.dto';
import { UpdateServiceModuleSectionDto } from './dto/update-service.dto';
import { ServiceModuleSectionService } from './service.service';

@Controller('admin/service-module')
@UseGuards(JwtAuthGuard)
export class ServiceModuleSectionController {
  constructor(
    private readonly serviceModuleSectionService: ServiceModuleSectionService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'featured_image', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  create(
    @Body() dto: CreateServiceModuleSectionDto,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      featured_image?: Express.Multer.File[];
    },
  ) {
    return this.serviceModuleSectionService.create(dto, files);
  }

  @Get()
  findAll() {
    return this.serviceModuleSectionService.findAll();
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'featured_image', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceModuleSectionDto,
    @UploadedFiles()
    files?: {
      thumbnail?: Express.Multer.File[];
      featured_image?: Express.Multer.File[];
    },
  ) {
    return this.serviceModuleSectionService.update(id, dto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceModuleSectionService.remove(id);
  }
}
