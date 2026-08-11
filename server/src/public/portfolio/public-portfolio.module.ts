import { Module } from '@nestjs/common';
import { PortfolioModule } from '../../modules/portfolio/portfolio.module';
import { PublicPortfolioController } from './public-portfolio.controller';

@Module({
  imports: [PortfolioModule],
  controllers: [PublicPortfolioController],
})
export class PublicPortfolioModule {}
