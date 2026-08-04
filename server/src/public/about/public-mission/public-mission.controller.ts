import { Controller, Get } from '@nestjs/common';
import { MissionService } from '../../../modules/about/mission/mission.service';
import { MissionParagraphService } from '../../../modules/about/mission/mission_paragraph.service';

@Controller('about/mission')
export class PublicMissionController {
  constructor(
    private readonly missionService: MissionService,
    private readonly missionParagraphService: MissionParagraphService,
  ) {}

  @Get()
  findAllMission() {
    return this.missionService.findAll();
  }
  @Get('paragraph')
  findAllMissionParagraph() {
    return this.missionParagraphService.findAll();
  }
}
