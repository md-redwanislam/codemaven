import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../database/database.module';
import { PortfolioCategoryController } from './portfolio_category.controller';
import { PortfolioCategoryService } from './portfolio_category.service';
import { PortfolioProjectController } from './portfolio_project.controller';
import { PortfolioProjectService } from './portfolio_project.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [PortfolioCategoryController, PortfolioProjectController],
  providers: [PortfolioCategoryService, PortfolioProjectService],
  exports: [PortfolioCategoryService, PortfolioProjectService],
})
export class PortfolioModule {}
