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
import { CreatePortfolioProjectDto } from './dto/create-portfolio_project.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio_project.dto';
import { PortfolioProjectService } from './portfolio_project.service';

@Controller('admin/portfolio/project')
@UseGuards(JwtAuthGuard)
export class PortfolioProjectController {
  constructor(
    private readonly portfolioProjectService: PortfolioProjectService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover_image', multerOptions))
  create(
    @Body() dto: CreatePortfolioProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.portfolioProjectService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.portfolioProjectService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('cover_image', multerOptions))
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioProjectDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.portfolioProjectService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioProjectService.remove(id);
  }
}
