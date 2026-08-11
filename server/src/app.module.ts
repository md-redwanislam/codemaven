import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChooseUsModule } from './modules/home/choose_us/choose_us.module';
import { ContactSectionModule } from './modules/home/contact-section/contact-section.module';
import { CtaModule } from './modules/home/cta/cta.module';
import { FaqModule } from './modules/home/faq/faq.module';
import { HeroModule } from './modules/home/hero/hero.module';
import { LogoSectionModule } from './modules/home/logo-section/logo-section.module';
import { ServiceSectionModule } from './modules/home/service-section/service-section.module';
import { SolutionsSectionModule } from './modules/home/solutions-section/solutions-section.module';
import { StatisticModule } from './modules/home/statistic/statistic.module';

import { AboutModule } from './modules/about/about.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ServiceModule } from './modules/service_module/service.module';
import { PublicAboutModule } from './public/about/public-about.module';
import { PublicHomeModule } from './public/home/public-home.module';
import { PublicPortfolioModule } from './public/portfolio/public-portfolio.module';
import { PublicServiceModule } from './public/service_module/public-service-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    AuthModule,
    HeroModule,
    CtaModule,
    FaqModule,
    ChooseUsModule,
    SolutionsSectionModule,
    ServiceSectionModule,
    LogoSectionModule,
    ContactSectionModule,
    PublicHomeModule,
    StatisticModule,
    AboutModule,
    PublicAboutModule,
    ServiceModule,
    PublicServiceModule,
    PortfolioModule,
    PublicPortfolioModule,
  ],
})
export class AppModule {}
