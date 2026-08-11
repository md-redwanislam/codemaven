import { Controller, Get } from '@nestjs/common';
import { HeroService } from '../../modules/about/hero/hero.service';
import { HighlightCardService } from '../../modules/about/hero/highlight-card.service';
import { StatCounterService } from '../../modules/about/hero/stat-counter.service';
import { MissionService } from '../../modules/about/mission/mission.service';
import { MissionParagraphService } from '../../modules/about/mission/mission_paragraph.service';
import { WorkProcessStepService } from '../../modules/about/work-process/work-process-step.service';
import { WorkProcessService } from '../../modules/about/work-process/work-process.service';

@Controller('about')
export class PublicAboutController {
  constructor(
    private readonly heroService: HeroService,
    private readonly highlightCardService: HighlightCardService,
    private readonly statCounterService: StatCounterService,

    private readonly missionService: MissionService,
    private readonly missionParagraphService: MissionParagraphService,

    private readonly workProcessService: WorkProcessService,
    private readonly workProcessStepService: WorkProcessStepService,
  ) {}

  // Hero
  @Get('hero-section')
  findHeroSection() {
    return this.heroService.findAll();
  }

  @Get('highlight-card')
  findHighlightCards() {
    return this.highlightCardService.findAll();
  }

  @Get('stat-counter')
  findStatCounters() {
    return this.statCounterService.findAll();
  }

  // Mission
  @Get('mission')
  findMission() {
    return this.missionService.findAll();
  }

  @Get('mission/paragraph')
  findMissionParagraphs() {
    return this.missionParagraphService.findAll();
  }

  // Work Process
  @Get('work-process')
  findWorkProcess() {
    return this.workProcessService.findAll();
  }

  @Get('work-process/step')
  findWorkProcessSteps() {
    return this.workProcessStepService.findAll();
  }
}
