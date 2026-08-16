import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCtaDto } from '../home/dto/create-cta.dto';
import { UpdateCtaDto } from '../home/dto/update-cta.dto';
import { PricingCtaService } from './cta.service';
import { CreatePricingTrustDto } from './dto/create-hero-trust.dto';
import { CreatePricingHeroDto } from './dto/create-pricing-hero.dto';
import { UpdatePricingTrustDto } from './dto/update-hero-trust.dto';
import { UpdatePricingHeroDto } from './dto/update-pricing-hero.dto';
import { HeroService } from './hero.service';

@Controller('admin/pricing')
export class PricingController {
  constructor(
    private readonly heroService: HeroService,
    private readonly pricingCtaService: PricingCtaService,
  ) {}

  @Post('hero')
  createHero(@Body() dto: CreatePricingHeroDto) {
    return this.heroService.createHero(dto);
  }

  @Get('hero')
  findHero() {
    return this.heroService.findHero();
  }

  @Put('hero/:id')
  updateHero(@Body() dto: UpdatePricingHeroDto) {
    return this.heroService.updateHero(dto);
  }

  @Delete('hero/:id')
  removeHero() {
    return this.heroService.removeHero();
  }

  // ============================================================
  // Price Hero Trust
  // ============================================================

  @Post('trust')
  createTrust(@Body() dto: CreatePricingTrustDto) {
    return this.heroService.createTrust(dto);
  }

  @Get('trust')
  findAllTrust() {
    return this.heroService.findAllTrust();
  }

  @Put('trust/:id')
  updateTrust(@Param('id') id: string, @Body() dto: UpdatePricingTrustDto) {
    return this.heroService.updateTrust(id, dto);
  }

  @Delete('trust/:id')
  removeTrust(@Param('id') id: string) {
    return this.heroService.removeTrust(id);
  }

  // ============================================================
  // Pricing CTA
  // ============================================================

  @Post('cta')
  createCta(@Body() dto: CreateCtaDto) {
    return this.pricingCtaService.createCta(dto);
  }

  @Get('cta')
  findCta() {
    return this.pricingCtaService.findCta();
  }

  @Put('cta/:id')
  updateCta(@Param('id') id: string, @Body() dto: UpdateCtaDto) {
    return this.pricingCtaService.updateCta(id, dto);
  }

  @Delete('cta/:id')
  removeCta(@Param('id') id: string) {
    return this.pricingCtaService.removeCta(id);
  }
}
