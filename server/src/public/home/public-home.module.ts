import { Module } from '@nestjs/common';
import { ChooseUsModule } from '../../modules/home/choose_us/choose_us.module';
import { ContactSectionModule } from '../../modules/home/contact-section/contact-section.module';
import { CtaModule } from '../../modules/home/cta/cta.module';
import { FaqModule } from '../../modules/home/faq/faq.module';
import { HeroModule } from '../../modules/home/hero/hero.module';
import { LogoSectionModule } from '../../modules/home/logo-section/logo-section.module';
import { ServiceSectionModule } from '../../modules/home/service-section/service-section.module';
import { SolutionsSectionModule } from '../../modules/home/solutions-section/solutions-section.module';
import { StatisticModule } from '../../modules/home/statistic/statistic.module';
import { PublicHomeController } from './public-home.controller';

@Module({
  imports: [
    ChooseUsModule,
    ContactSectionModule,
    CtaModule,
    FaqModule,
    HeroModule,
    LogoSectionModule,
    ServiceSectionModule,
    SolutionsSectionModule,
    StatisticModule,
  ],
  controllers: [PublicHomeController],
})
export class PublicHomeModule {}
