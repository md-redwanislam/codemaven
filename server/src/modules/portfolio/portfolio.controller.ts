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

import { CreatePortfolioCategoryDto } from './dto/create-portfolio_category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio_category.dto';

import { CreatePortfolioProjectDto } from './dto/create-portfolio_project.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio_project.dto';

import { CreatePortfolioHeroDto } from './dto/create-portfolio_hero.dto';
import { UpdatePortfolioHeroDto } from './dto/update-portfolio_hero.dto';

import { CreatePortfolioShowcaseDto } from './dto/create-portfolio_showcase.dto';
import { CreatePortfolioStateDto } from './dto/create-portfolio_state.dto';
import { UpdatePortfolioShowcaseDto } from './dto/update-portfolio_showcase.dto';
import { UpdatePortfolioStateDto } from './dto/update-portfolio_state.dto';
import { PortfolioService } from './portfolio.service';

@Controller('admin/portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // ============================================================
  // Portfolio Category
  // ============================================================

  @Post('category')
  createCategory(@Body() dto: CreatePortfolioCategoryDto) {
    return this.portfolioService.createCategory(dto);
  }

  @Get('category')
  findAllCategories() {
    return this.portfolioService.findAllCategories();
  }

  @Put('category/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioCategoryDto,
  ) {
    return this.portfolioService.updateCategory(id, dto);
  }

  @Delete('category/:id')
  removeCategory(@Param('id') id: string) {
    return this.portfolioService.removeCategory(id);
  }

  // ============================================================
  // Portfolio Project
  // ============================================================

  @Post('project')
  @UseInterceptors(FileInterceptor('cover_image', multerOptions))
  createProject(
    @Body() dto: CreatePortfolioProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.portfolioService.createProject(dto, file);
  }

  @Get('project')
  findAllProjects() {
    return this.portfolioService.findAllProjects();
  }

  @Put('project/:id')
  @UseInterceptors(FileInterceptor('cover_image', multerOptions))
  updateProject(
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioProjectDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.portfolioService.updateProject(id, dto, file);
  }

  @Delete('project/:id')
  removeProject(@Param('id') id: string) {
    return this.portfolioService.removeProject(id);
  }

  // ============================================================
  // Portfolio Hero
  // ============================================================

  @Post('hero')
  createHero(@Body() dto: CreatePortfolioHeroDto) {
    return this.portfolioService.createHero(dto);
  }

  @Get('hero')
  findHero() {
    return this.portfolioService.findHero();
  }

  @Put('hero/:id')
  updateHero(@Body() dto: UpdatePortfolioHeroDto) {
    return this.portfolioService.updateHero(dto);
  }

  @Delete('hero/:id')
  removeHero() {
    return this.portfolioService.removeHero();
  }

  // ============================================================
  // Portfolio Showcase
  // ============================================================

  @Post('showcase')
  createShowcase(@Body() dto: CreatePortfolioShowcaseDto) {
    return this.portfolioService.createShowcase(dto);
  }

  @Get('showcase')
  findShowcase() {
    return this.portfolioService.findShowcase();
  }

  @Put('showcase/:id')
  updateShowcase(@Body() dto: UpdatePortfolioShowcaseDto) {
    return this.portfolioService.updateShowcase(dto);
  }

  @Delete('showcase/:id')
  removeShowcase() {
    return this.portfolioService.removeShowcase();
  }

  // ============================================================
  // Portfolio State Counter
  // ============================================================

  @Post('state')
  createState(@Body() dto: CreatePortfolioStateDto) {
    return this.portfolioService.createState(dto);
  }

  @Get('state')
  findAllStates() {
    return this.portfolioService.findAllStates();
  }

  @Put('state/:id')
  updateState(@Param('id') id: string, @Body() dto: UpdatePortfolioStateDto) {
    return this.portfolioService.updateState(id, dto);
  }

  @Delete('state/:id')
  removeState(@Param('id') id: string) {
    return this.portfolioService.removeState(id);
  }
}
