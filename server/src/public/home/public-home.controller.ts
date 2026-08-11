import { Controller, Get } from '@nestjs/common';
import { ChooseUsService } from '../../modules/home/choose_us/choose_us.service';
import { ChooseUsReasonService } from '../../modules/home/choose_us/choose_us_reason.service';
import { ContactSectionService } from '../../modules/home/contact-section/contact-section.service';
import { CtaService } from '../../modules/home/cta/cta.service';
import { AddFaqService } from '../../modules/home/faq/add-faq.service';
import { FaqService } from '../../modules/home/faq/faq.service';
import { HeroService } from '../../modules/home/hero/hero.service';
import { LogoSectionService } from '../../modules/home/logo-section/logo-section.service';
import { ServiceCardService } from '../../modules/home/service-section/service-card.service';
import { ServiceSectionService } from '../../modules/home/service-section/service-section.service';
import { IndustryCardService } from '../../modules/home/solutions-section/industry-card.service';
import { SolutionsSectionService } from '../../modules/home/solutions-section/solutions-section.service';
import { StatisticService } from '../../modules/home/statistic/statistic.service';

@Controller('home')
export class PublicHomeController {
  constructor(
    private readonly chooseUsService: ChooseUsService,
    private readonly chooseUsReasonService: ChooseUsReasonService,

    private readonly contactSectionService: ContactSectionService,

    private readonly ctaService: CtaService,

    private readonly faqService: FaqService,
    private readonly addFaqService: AddFaqService,

    private readonly heroService: HeroService,

    private readonly logoSectionService: LogoSectionService,

    private readonly serviceSectionService: ServiceSectionService,
    private readonly serviceCardService: ServiceCardService,

    private readonly solutionsSectionService: SolutionsSectionService,
    private readonly industryCardService: IndustryCardService,

    private readonly statisticService: StatisticService,
  ) {}

  // Choose Us
  @Get('choose-us')
  findAllChooseUs() {
    return this.chooseUsService.findAll();
  }

  @Get('choose-us/reasons')
  findAllChooseUsReasons() {
    return this.chooseUsReasonService.findAll();
  }

  // Contact Section
  @Get('contact-section')
  findAllContactSection() {
    return this.contactSectionService.findAll();
  }

  // CTA
  @Get('cta')
  findAllCta() {
    return this.ctaService.findOne();
  }

  // FAQ
  @Get('faq')
  findAllFaq() {
    return this.faqService.findAll();
  }

  @Get('faq/items')
  findAllFaqItems() {
    return this.addFaqService.findAll();
  }

  // Hero
  @Get('hero')
  findAllHero() {
    return this.heroService.findOne();
  }

  // Logo Section
  @Get('logo-section')
  findAllLogoSection() {
    return this.logoSectionService.findAll();
  }

  // Service Section
  @Get('service-section')
  findAllServiceSection() {
    return this.serviceSectionService.findAll();
  }

  @Get('service-section/cards')
  findAllServiceCards() {
    return this.serviceCardService.findAll();
  }

  // Solutions Section
  @Get('solutions-section')
  findAllSolutionsSection() {
    return this.solutionsSectionService.findAll();
  }

  @Get('solutions-section/cards')
  findAllIndustryCards() {
    return this.industryCardService.findAll();
  }

  // Statistic
  @Get('statistic')
  findAllStatistic() {
    return this.statisticService.findAll();
  }
}
