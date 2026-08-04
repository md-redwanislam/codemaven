import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { multerOptions } from '../../../common/utils/multer';
import { AddLogoService } from './add-logo.service';

@Controller('admin/home/add-logo')
@UseGuards(JwtAuthGuard)
export class AddLogoController {
  constructor(private readonly addLogoService: AddLogoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  create(
    @Body('name') name: string,
    @Body('status', ParseBoolPipe) status: boolean,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.addLogoService.create({ name, status }, file);
  }

  @Get()
  findAll() {
    return this.addLogoService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('status', ParseBoolPipe) status: boolean,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.addLogoService.update(id, { name, status }, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addLogoService.remove(id);
  }
}
