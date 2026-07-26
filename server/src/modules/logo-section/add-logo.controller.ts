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

import { AddLogoService } from './add-logo.service';
import { CreateAddLogoDto } from './dto/create-add-logo.dto';
import { UpdateAddLogoDto } from './dto/update-add-logo.dto';

@Controller('admin/home/add-logo')
@UseGuards(JwtAuthGuard)
export class AddLogoController {
  constructor(private readonly addLogoService: AddLogoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  create(
    @Body() dto: CreateAddLogoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.addLogoService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.addLogoService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAddLogoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.addLogoService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addLogoService.remove(id);
  }
}
