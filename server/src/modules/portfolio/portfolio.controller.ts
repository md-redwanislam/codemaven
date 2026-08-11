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
}
