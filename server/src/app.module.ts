import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CtaModule } from './modules/cta/cta.module';
import { HeroModule } from './modules/hero/hero.module';

import { ChooseUsModule } from './modules/choose_us/choose_us.module';
import { ContactSectionModule } from './modules/contact-section/contact-section.module';
import { LogoSectionModule } from './modules/logo-section/logo-section.module';
import { ServiceSectionModule } from './modules/service-section/service-section.module';
import { SolutionsSectionModule } from './modules/solutions-section/solutions-section.module';

import config from './common/config/config';
import { FaqModule } from './modules/faq/faq.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { PublicChooseUsModule } from './public/public-choose-us/public-choose-us.module';
import { PublicContactSectionModule } from './public/public-contact-section/public-contact-section.module';
import { PublicCtaModule } from './public/public-cta/public-cta.module';
import { PublicFaqModule } from './public/public-faq/public-faq.module';
import { PublicHeroModule } from './public/public-hero/public-hero.module';
import { PublicLogoSectionModule } from './public/public-logo-section/public-logo-section.module';
import { PublicServiceSectionModule } from './public/public-service-section/public-service-section.module';
import { PublicSolutionsSectionModule } from './public/public-solutions-section/public-solutions-section.module';
import { PublicStatisticModule } from './public/public-statistic/public-statistic.module';

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
  ],
})
export class AppModule {}
