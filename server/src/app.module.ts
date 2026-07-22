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

import config from './config/config';
import { FaqModule } from './modules/faq/faq.module';
import { PublicCtaModule } from './public/public-cta/public-cta.module';
import { PublicHeroModule } from './public/public-hero/public-hero.module';

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
  ],
})
export class AppModule {}
