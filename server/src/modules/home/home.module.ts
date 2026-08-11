import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../database/database.module';
import { ChooseUsService } from './choose-us.service';
import { ContactSectionService } from './contact-section.service';
import { CtaService } from './cta.service';
import { FaqService } from './faq.service';
import { HeroService } from './hero.service';
import { HomeController } from './home.controller';
import { LogoSectionService } from './logo-section.service';
import { ServiceSectionService } from './service-section.service';
import { SolutionsSectionService } from './solution-section.service';
import { StatisticService } from './statistic.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [HomeController],

  providers: [
    ChooseUsService,
    ContactSectionService,
    CtaService,
    FaqService,
    HeroService,
    LogoSectionService,
    ServiceSectionService,
    SolutionsSectionService,
    StatisticService,
  ],

  exports: [
    ChooseUsService,
    ContactSectionService,
    CtaService,
    FaqService,
    HeroService,
    LogoSectionService,
    ServiceSectionService,
    SolutionsSectionService,
    StatisticService,
  ],
})
export class HomeModule {}
