import { Controller, Get } from '@nestjs/common';
import { HeroService } from '../../modules/about/hero.service';
import { MissionService } from '../../modules/about/mission.service';
import { WorkProcessService } from '../../modules/about/work-process.service';

@Controller('about')
export class PublicAboutController {
  constructor(
    private readonly heroService: HeroService,

    private readonly missionService: MissionService,

    private readonly workProcessService: WorkProcessService,
  ) {}

  // Hero
  @Get('hero-section')
  findHeroSection() {
    return this.heroService.findAllHeroes();
  }

  @Get('highlight-card')
  findHighlightCards() {
    return this.heroService.findAllHighlightCards();
  }

  @Get('stat-counter')
  findStatCounters() {
    return this.heroService.findAllStatCounters();
  }

  // Mission
  @Get('mission')
  findMission() {
    return this.missionService.findAllMissions();
  }

  @Get('mission/paragraph')
  findMissionParagraphs() {
    return this.missionService.findAllMissionParagraphs();
  }

  // Work Process
  @Get('work-process')
  findWorkProcess() {
    return this.workProcessService.findAllWorkProcesses();
  }

  @Get('work-process/step')
  findWorkProcessSteps() {
    return this.workProcessService.findAllWorkProcessSteps();
  }
}
