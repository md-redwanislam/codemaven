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
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateMissionSectionDto } from './dto/create-mission.dto';
import { CreateMissionParagraphDto } from './dto/create-mission_paragraph.dto';
import { UpdateMissionSectionDto } from './dto/update-mission.dto';
import { UpdateMissionParagraphDto } from './dto/update-mission_paragraph.dto';

import { CreateHighlightCardDto } from './dto/create-highlight-card.dto';
import { CreateStatCounterDto } from './dto/create-stat-counter.dto';
import { CreateWorkProcessStepDto } from './dto/create-work-process-step.dto';
import { CreateWorkProcessDto } from './dto/create-work-process.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateHighlightCardDto } from './dto/update-highlight-card.dto';
import { UpdateStatCounterDto } from './dto/update-stat-counter.dto';
import { UpdateWorkProcessStepDto } from './dto/update-work-process-step.dto';
import { UpdateWorkProcessDto } from './dto/update-work-process.dto';
import { HeroService } from './hero.service';
import { MissionService } from './mission.service';
import { WorkProcessService } from './work-process.service';

@Controller('admin/about')
@UseGuards(JwtAuthGuard)
export class AboutController {
  constructor(
    private readonly heroService: HeroService,
    private readonly missionService: MissionService,
    private readonly workProcessService: WorkProcessService,
  ) {}

  // ============================================================
  // Hero Section
  // ============================================================

  @Post('hero-section')
  createHero(@Body() dto: CreateHeroDto) {
    return this.heroService.createHero(dto);
  }

  @Get('hero-section')
  findAllHeroes() {
    return this.heroService.findAllHeroes();
  }

  @Put('hero-section/:id')
  updateHero(@Param('id') id: string, @Body() dto: UpdateHeroDto) {
    return this.heroService.updateHero(id, dto);
  }

  @Delete('hero-section/:id')
  removeHero(@Param('id') id: string) {
    return this.heroService.removeHero(id);
  }

  // ============================================================
  // Highlight Card
  // ============================================================

  @Post('highlight-card')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  createHighlightCard(
    @Body() dto: CreateHighlightCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.heroService.createHighlightCard(dto, file);
  }

  @Get('highlight-card')
  findAllHighlightCards() {
    return this.heroService.findAllHighlightCards();
  }

  @Put('highlight-card/:id')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  updateHighlightCard(
    @Param('id') id: string,
    @Body() dto: UpdateHighlightCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.heroService.updateHighlightCard(id, dto, file);
  }

  @Delete('highlight-card/:id')
  removeHighlightCard(@Param('id') id: string) {
    return this.heroService.removeHighlightCard(id);
  }

  // ============================================================
  // Stat Counter
  // ============================================================

  @Post('stat-counter')
  createStatCounter(@Body() dto: CreateStatCounterDto) {
    return this.heroService.createStatCounter(dto);
  }

  @Get('stat-counter')
  findAllStatCounters() {
    return this.heroService.findAllStatCounters();
  }

  @Put('stat-counter/:id')
  updateStatCounter(
    @Param('id') id: string,
    @Body() dto: UpdateStatCounterDto,
  ) {
    return this.heroService.updateStatCounter(id, dto);
  }

  @Delete('stat-counter/:id')
  removeStatCounter(@Param('id') id: string) {
    return this.heroService.removeStatCounter(id);
  }

  // ============================================================
  // Mission
  // ============================================================

  @Post('mission')
  @UseInterceptors(FileInterceptor('section_image', multerOptions))
  createMission(
    @Body() dto: CreateMissionSectionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.missionService.createMission(dto, file);
  }

  @Get('mission')
  findAllMissions() {
    return this.missionService.findAllMissions();
  }

  @Put('mission/:id')
  @UseInterceptors(FileInterceptor('section_image', multerOptions))
  updateMission(
    @Param('id') id: string,
    @Body() dto: UpdateMissionSectionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.missionService.updateMission(id, dto, file);
  }

  @Delete('mission/:id')
  removeMission(@Param('id') id: string) {
    return this.missionService.removeMission(id);
  }

  // ============================================================
  // Mission Paragraph
  // ============================================================

  @Post('mission/paragraph')
  createMissionParagraph(@Body() dto: CreateMissionParagraphDto) {
    return this.missionService.createMissionParagraph(dto);
  }

  @Get('mission/paragraph')
  findAllMissionParagraphs() {
    return this.missionService.findAllMissionParagraphs();
  }

  @Put('mission/paragraph/:id')
  updateMissionParagraph(
    @Param('id') id: string,
    @Body() dto: UpdateMissionParagraphDto,
  ) {
    return this.missionService.updateMissionParagraph(id, dto);
  }

  @Delete('mission/paragraph/:id')
  removeMissionParagraph(@Param('id') id: string) {
    return this.missionService.removeMissionParagraph(id);
  }

  // ============================================================
  // Work Process
  // ============================================================

  @Post('work-process')
  createWorkProcess(@Body() dto: CreateWorkProcessDto) {
    return this.workProcessService.createWorkProcess(dto);
  }

  @Get('work-process')
  findAllWorkProcesses() {
    return this.workProcessService.findAllWorkProcesses();
  }

  @Put('work-process/:id')
  updateWorkProcess(
    @Param('id') id: string,
    @Body() dto: UpdateWorkProcessDto,
  ) {
    return this.workProcessService.updateWorkProcess(id, dto);
  }

  @Delete('work-process/:id')
  removeWorkProcess(@Param('id') id: string) {
    return this.workProcessService.removeWorkProcess(id);
  }

  // ============================================================
  // Work Process Step
  // ============================================================

  @Post('work-process/step')
  createWorkProcessStep(@Body() dto: CreateWorkProcessStepDto) {
    return this.workProcessService.createWorkProcessStep(dto);
  }

  @Get('work-process/step')
  findAllWorkProcessSteps() {
    return this.workProcessService.findAllWorkProcessSteps();
  }

  @Put('work-process/step/:id')
  updateWorkProcessStep(
    @Param('id') id: string,
    @Body() dto: UpdateWorkProcessStepDto,
  ) {
    return this.workProcessService.updateWorkProcessStep(id, dto);
  }

  @Delete('work-process/step/:id')
  removeWorkProcessStep(@Param('id') id: string) {
    return this.workProcessService.removeWorkProcessStep(id);
  }
}
