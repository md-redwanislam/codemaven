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
import { PublicChooseUsModule } from './public/home/public-choose-us/public-choose-us.module';
import { PublicContactSectionModule } from './public/home/public-contact-section/public-contact-section.module';
import { PublicCtaModule } from './public/home/public-cta/public-cta.module';
import { PublicFaqModule } from './public/home/public-faq/public-faq.module';
import { PublicHeroModule } from './public/home/public-hero/public-hero.module';
import { PublicLogoSectionModule } from './public/home/public-logo-section/public-logo-section.module';
import { PublicServiceSectionModule } from './public/home/public-service-section/public-service-section.module';
import { PublicSolutionsSectionModule } from './public/home/public-solutions-section/public-solutions-section.module';
import { PublicStatisticModule } from './public/home/public-statistic/public-statistic.module';

import { AboutHeroModule } from './modules/about/hero/hero.module';
import { MissionModule } from './modules/about/mission/mission.module';
import { WorkProcessModule } from './modules/about/work-process/work-process.module';

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
    PublicCtaModule,
    PublicHeroModule,
    PublicChooseUsModule,
    PublicContactSectionModule,
    PublicFaqModule,
    PublicLogoSectionModule,
    PublicServiceSectionModule,
    PublicSolutionsSectionModule,
    PublicStatisticModule,
    StatisticModule,
    MissionModule,
    WorkProcessModule,
    AboutHeroModule,
  ],
})
export class AppModule {}
