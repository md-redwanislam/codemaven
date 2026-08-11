import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { multerOptions } from '../../common/utils/multer';
import { ChooseUsService } from './choose-us.service';
import { ContactSectionService } from './contact-section.service';
import { CtaService } from './cta.service';
import { CreateAddFAQDto } from './dto/create-add-faq.dto';
import { CreateChooseUsDto } from './dto/create-choose_us.dto';
import { CreateChooseUsReasonDto } from './dto/create-choose_us_reason.dto';
import { CreateContactSectionDto } from './dto/create-contact-section.dto';
import { CreateCtaDto } from './dto/create-cta.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateIndustryCardDto } from './dto/create-industry-card.dto';
import { CreateLogoSectionDto } from './dto/create-logo-section.dto';
import { CreateServiceCardDto } from './dto/create-service-card.dto';
import { CreateServiceSectionDto } from './dto/create-service-section.dto';
import { CreateSolutionsSectionDto } from './dto/create-solutions-section.dto';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateAddFAQDto } from './dto/update-add-faq.dto';
import { UpdateChooseUsDto } from './dto/update-choose_us.dto';
import { UpdateChooseUsReasonDto } from './dto/update-choose_us_reason.dto';
import { UpdateContactSectionDto } from './dto/update-contact-section.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateIndustryCardDto } from './dto/update-industry-card';
import { UpdateLogoSectionDto } from './dto/update-logo-section.dto';
import { UpdateServiceCardDto } from './dto/update-service-card';
import { UpdateServiceSectionDto } from './dto/update-service-section.dto';
import { UpdateSolutionsSectionDto } from './dto/update-solutions-section.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { FaqService } from './faq.service';
import { HeroService } from './hero.service';
import { LogoSectionService } from './logo-section.service';
import { ServiceSectionService } from './service-section.service';
import { SolutionsSectionService } from './solution-section.service';
import { StatisticService } from './statistic.service';

@Controller('admin/home')
@UseGuards(JwtAuthGuard)
export class HomeController {
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

  @Post('hero')
  createHero(@Body() dto: CreateHeroDto) {
    return this.heroService.createHero(dto);
  }

  @Get('hero')
  findHero() {
    return this.heroService.findHero();
  }

  @Put('hero/:id')
  updateHero(@Param('id') id: string, @Body() dto: UpdateHeroDto) {
    return this.heroService.updateHero(id, dto);
  }

  @Delete('hero/:id')
  removeHero(@Param('id') id: string) {
    return this.heroService.removeHero(id);
  }

  // ============================================================
  // Choose Us
  // ============================================================

  @Post('choose-us')
  createChooseUs(@Body() dto: CreateChooseUsDto) {
    return this.chooseUsService.createChooseUs(dto);
  }

  @Get('choose-us')
  findChooseUs() {
    return this.chooseUsService.findAllChooseUs();
  }

  @Put('choose-us/:id')
  updateChooseUs(@Param('id') id: string, @Body() dto: UpdateChooseUsDto) {
    return this.chooseUsService.updateChooseUs(id, dto);
  }

  @Delete('choose-us/:id')
  removeChooseUs(@Param('id') id: string) {
    return this.chooseUsService.removeChooseUs(id);
  }

  // ============================================================
  // Choose Us Reason
  // ============================================================

  @Post('choose-us/reason')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  createChooseUsReason(
    @Body() dto: CreateChooseUsReasonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.chooseUsService.createChooseUsReason(dto, file);
  }

  @Get('choose-us/reason')
  findChooseUsReasons() {
    return this.chooseUsService.findAllChooseUsReasons();
  }

  @Put('choose-us/reason/:id')
  @UseInterceptors(FileInterceptor('icon', multerOptions))
  updateChooseUsReason(
    @Param('id') id: string,
    @Body() dto: UpdateChooseUsReasonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.chooseUsService.updateChooseUsReason(id, dto, file);
  }

  @Delete('choose-us/reason/:id')
  removeChooseUsReason(@Param('id') id: string) {
    return this.chooseUsService.removeChooseUsReason(id);
  }

  // ============================================================
  // Contact Section
  // ============================================================

  @Post('contact-section')
  createContactSection(@Body() dto: CreateContactSectionDto) {
    return this.contactSectionService.createContactSection(dto);
  }

  @Get('contact-section')
  findContactSection() {
    return this.contactSectionService.findContactSection();
  }

  @Put('contact-section/:id')
  updateContactSection(
    @Param('id') id: string,
    @Body() dto: UpdateContactSectionDto,
  ) {
    return this.contactSectionService.updateContactSection(id, dto);
  }

  @Delete('contact-section/:id')
  removeContactSection(@Param('id') id: string) {
    return this.contactSectionService.removeContactSection(id);
  }

  // ============================================================
  // CTA
  // ============================================================

  @Post('cta')
  createCta(@Body() dto: CreateCtaDto) {
    return this.ctaService.createCta(dto);
  }

  @Get('cta')
  findCta() {
    return this.ctaService.findCta();
  }

  @Put('cta/:id')
  updateCta(@Param('id') id: string, @Body() dto: UpdateCtaDto) {
    return this.ctaService.updateCta(id, dto);
  }

  @Delete('cta/:id')
  removeCta(@Param('id') id: string) {
    return this.ctaService.removeCta(id);
  }

  // ============================================================
  // FAQ
  // ============================================================

  @Post('faq')
  createFaq(@Body() dto: CreateFaqDto) {
    return this.faqService.createFaq(dto);
  }

  @Get('faq')
  findFaqs() {
    return this.faqService.findAllFaqs();
  }

  @Put('faq/:id')
  updateFaq(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.updateFaq(id, dto);
  }

  @Delete('faq/:id')
  removeFaq(@Param('id') id: string) {
    return this.faqService.removeFaq(id);
  }

  // ============================================================
  // Add FAQ
  // ============================================================

  @Post('add-faq')
  createFaqItem(@Body() dto: CreateAddFAQDto) {
    return this.faqService.createFaqItem(dto);
  }

  @Get('add-faq')
  findFaqItems() {
    return this.faqService.findAllFaqItems();
  }

  @Put('add-faq/:id')
  updateFaqItem(@Param('id') id: string, @Body() dto: UpdateAddFAQDto) {
    return this.faqService.updateFaqItem(id, dto);
  }

  @Delete('add-faq/:id')
  removeFaqItem(@Param('id') id: string) {
    return this.faqService.removeFaqItem(id);
  }

  // ============================================================
  // Logo Section
  // ============================================================

  @Post('logo-section')
  createLogoSection(@Body() dto: CreateLogoSectionDto) {
    return this.logoSectionService.createLogoSection(dto);
  }

  @Get('logo-section')
  findLogoSection() {
    return this.logoSectionService.findAllLogoSections();
  }

  @Put('logo-section/:id')
  updateLogoSection(
    @Param('id') id: string,
    @Body() dto: UpdateLogoSectionDto,
  ) {
    return this.logoSectionService.updateLogoSection(id, dto);
  }

  @Delete('logo-section/:id')
  removeLogoSection(@Param('id') id: string) {
    return this.logoSectionService.removeLogoSection(id);
  }

  // ============================================================
  // Add Logo
  // ============================================================

  @Post('add-logo')
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  createLogo(
    @Body('name') name: string,
    @Body('status', ParseBoolPipe) status: boolean,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.logoSectionService.createLogo({ name, status }, file);
  }

  @Get('add-logo')
  findLogos() {
    return this.logoSectionService.findAllLogos();
  }

  @Put('add-logo/:id')
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  updateLogo(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('status', ParseBoolPipe) status: boolean,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.logoSectionService.updateLogo(id, { name, status }, file);
  }

  @Delete('add-logo/:id')
  removeLogo(@Param('id') id: string) {
    return this.logoSectionService.removeLogo(id);
  }

  // ============================================================
  // Service Section
  // ============================================================

  @Post('service-section')
  createServiceSection(@Body() dto: CreateServiceSectionDto) {
    return this.ServiceSectionService.createServiceSection(dto);
  }

  @Get('service-section')
  findServiceSection() {
    return this.ServiceSectionService.findAllServiceSections();
  }

  @Put('service-section/:id')
  updateServiceSection(
    @Param('id') id: string,
    @Body() dto: UpdateServiceSectionDto,
  ) {
    return this.ServiceSectionService.updateServiceSection(id, dto);
  }

  @Delete('service-section/:id')
  removeServiceSection(@Param('id') id: string) {
    return this.ServiceSectionService.removeServiceSection(id);
  }

  // ============================================================
  // Service Card
  // ============================================================

  @Post('service-card')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  createServiceCard(
    @Body() dto: CreateServiceCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ServiceSectionService.createServiceCard(dto, file);
  }

  @Get('service-card')
  findServiceCards() {
    return this.ServiceSectionService.findAllServiceCards();
  }

  @Put('service-card/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  updateServiceCard(
    @Param('id') id: string,
    @Body() dto: UpdateServiceCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ServiceSectionService.updateServiceCard(id, dto, file);
  }

  @Delete('service-card/:id')
  removeServiceCard(@Param('id') id: string) {
    return this.ServiceSectionService.removeServiceCard(id);
  }

  // ============================================================
  // Solutions Section
  // ============================================================

  @Post('solution-section')
  createSolutionsSection(@Body() dto: CreateSolutionsSectionDto) {
    return this.solutionsSectionService.createSolutionsSection(dto);
  }

  @Get('solution-section')
  findSolutionsSection() {
    return this.solutionsSectionService.findAllSolutionsSections();
  }

  @Put('solution-section/:id')
  updateSolutionsSection(
    @Param('id') id: string,
    @Body() dto: UpdateSolutionsSectionDto,
  ) {
    return this.solutionsSectionService.updateSolutionsSection(id, dto);
  }

  @Delete('solution-section/:id')
  removeSolutionsSection(@Param('id') id: string) {
    return this.solutionsSectionService.removeSolutionsSection(id);
  }

  // ============================================================
  // Industry Card
  // ============================================================

  @Post('industry-card')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  createIndustryCard(
    @Body() dto: CreateIndustryCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.solutionsSectionService.createIndustryCard(dto, file);
  }

  @Get('industry-card')
  findIndustryCards() {
    return this.solutionsSectionService.findAllIndustryCards();
  }

  @Put('industry-card/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  updateIndustryCard(
    @Param('id') id: string,
    @Body() dto: UpdateIndustryCardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.solutionsSectionService.updateIndustryCard(id, dto, file);
  }

  @Delete('industry-card/:id')
  removeIndustryCard(@Param('id') id: string) {
    return this.solutionsSectionService.removeIndustryCard(id);
  }

  // ============================================================
  // Statistic
  // ============================================================

  @Post('statistic')
  createStatistic(@Body() dto: CreateStatisticDto) {
    return this.statisticService.createStatistic(dto);
  }

  @Get('statistic')
  findStatistics() {
    return this.statisticService.findStatistics();
  }

  @Put('statistic/:id')
  updateStatistic(@Param('id') id: string, @Body() dto: UpdateStatisticDto) {
    return this.statisticService.updateStatistic(id, dto);
  }

  @Delete('statistic/:id')
  removeStatistic(@Param('id') id: string) {
    return this.statisticService.removeStatistic(id);
  }
}
