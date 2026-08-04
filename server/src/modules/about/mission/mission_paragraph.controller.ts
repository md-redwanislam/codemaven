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
import { CreateMissionParagraphDto } from './dto/create-mission_paragraph.dto';
import { UpdateMissionParagraphDto } from './dto/update-mission_paragraph.dto';
import { MissionParagraphService } from './mission_paragraph.service';

@Controller('admin/about/mission/paragraph')
@UseGuards(JwtAuthGuard)
export class MissionParagraphController {
  constructor(
    private readonly missionParagraphService: MissionParagraphService,
  ) {}

  @Post()
  create(@Body() dto: CreateMissionParagraphDto) {
    return this.missionParagraphService.create(dto);
  }

  @Get()
  findAll() {
    return this.missionParagraphService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMissionParagraphDto) {
    return this.missionParagraphService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionParagraphService.remove(id);
  }
}
