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
import { CreateMissionSectionDto } from './dto/create-mission.dto';
import { UpdateMissionSectionDto } from './dto/update-mission.dto';
import { MissionService } from './mission.service';

@Controller('admin/about/mission')
@UseGuards(JwtAuthGuard)
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('section_image', multerOptions))
  create(
    @Body() dto: CreateMissionSectionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.missionService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('section_image', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMissionSectionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.missionService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionService.remove(id);
  }
}
