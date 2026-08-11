import { Controller, Get } from '@nestjs/common';

import { ChooseUsService } from '../../modules/home/choose-us.service';
import { ContactSectionService } from '../../modules/home/contact-section.service';
import { CtaService } from '../../modules/home/cta.service';
import { FaqService } from '../../modules/home/faq.service';
import { HeroService } from '../../modules/home/hero.service';
import { LogoSectionService } from '../../modules/home/logo-section.service';
import { ServiceSectionService } from '../../modules/home/service-section.service';
import { SolutionsSectionService } from '../../modules/home/solution-section.service';
import { StatisticService } from '../../modules/home/statistic.service';

@Controller('home')
export class PublicHomeController {
  constructor(
    private readonly heroService: HeroService,
    private readonly chooseUsService: ChooseUsService,
    private readonly ctaService: CtaService,
    private readonly faqService: FaqService,
    private readonly statisticService: StatisticService,
    private readonly solutionsSectionService: SolutionsSectionService,
    private readonly ServiceSectionService: ServiceSectionService,
    private readonly logoSectionService: LogoSectionService,
    private readonly contactSectionService: ContactSectionService,
  ) {}

  // ============================================================
  // Hero
  // ============================================================

  @Get('hero')
  findHero() {
    return this.heroService.findHero();
  }

  // ============================================================
  // Choose Us
  // ============================================================

  @Get('choose-us')
  findAllChooseUs() {
    return this.chooseUsService.findAllChooseUs();
  }

  @Get('choose-us/reasons')
  findAllChooseUsReasons() {
    return this.chooseUsService.findAllChooseUsReasons();
  }

  // ============================================================
  // Contact Section
  // ============================================================

  @Get('contact-section')
  findAllContactSection() {
    return this.contactSectionService.findContactSection();
  }

  // ============================================================
  // CTA
  // ============================================================

  @Get('cta')
  findAllCta() {
    return this.ctaService.findCta();
  }

  // ============================================================
  // FAQ
  // ============================================================

  @Get('faq')
  findAllFaq() {
    return this.faqService.findAllFaqs();
  }

  @Get('faq/items')
  findAllFaqItems() {
    return this.faqService.findAllFaqItems();
  }

  // ============================================================
  // Logo Section
  // ============================================================

  @Get('logo-section')
  findAllLogoSection() {
    return this.logoSectionService.findAllLogoSections();
  }

  @Get('logo-section/logos')
  findAllLogos() {
    return this.logoSectionService.findAllLogos();
  }

  // ============================================================
  // Service Section
  // ============================================================

  @Get('service-section')
  findAllServiceSection() {
    return this.ServiceSectionService.findAllServiceSections();
  }

  @Get('service-section/cards')
  findAllServiceCards() {
    return this.ServiceSectionService.findAllServiceCards();
  }

  // ============================================================
  // Solutions Section
  // ============================================================

  @Get('solutions-section')
  findAllSolutionsSection() {
    return this.solutionsSectionService.findAllSolutionsSections();
  }

  @Get('solutions-section/cards')
  findAllIndustryCards() {
    return this.solutionsSectionService.findAllIndustryCards();
  }

  // ============================================================
  // Statistic
  // ============================================================

  @Get('statistic')
  findAllStatistic() {
    return this.statisticService.findStatistics();
  }
}
