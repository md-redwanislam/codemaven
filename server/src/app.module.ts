import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

import { AboutModule } from './modules/about/about.module';
import { HomeModule } from './modules/home/home.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { ServiceModule } from './modules/service_module/service.module';
import { PublicAboutModule } from './public/about/public-about.module';
import { PublicHomeModule } from './public/home/public-home.module';
import { PublicPortfolioModule } from './public/portfolio/public-portfolio.module';
import { PublicPricingModule } from './public/pricing/public-pricing.module';
import { PublicServiceModule } from './public/service_module/public-service-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    AuthModule,
    HomeModule,
    AboutModule,
    PortfolioModule,
    ServiceModule,
    PublicHomeModule,
    PublicAboutModule,
    PublicServiceModule,
    PublicPortfolioModule,
    PricingModule,
    PublicPricingModule,
  ],
})
export class AppModule {}
