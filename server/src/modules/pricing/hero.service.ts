import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { PriceHeroSection, PricingHeroTrust } from '../../common/interfaces';

import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreatePricingTrustDto } from './dto/create-hero-trust.dto';
import { CreatePricingHeroDto } from './dto/create-pricing-hero.dto';
import { UpdatePricingTrustDto } from './dto/update-hero-trust.dto';
import { UpdatePricingHeroDto } from './dto/update-pricing-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    // private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Price Hero
  // ============================================================

  async createHero(dto: CreatePricingHeroDto) {
    const [existing] = await this.db.execute<PriceHeroSection[]>(
      `
    SELECT id
    FROM pricing_hero_section
    LIMIT 1
    `,
    );

    if (existing.length > 0) {
      throw new BadRequestException('Pricing hero section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO pricing_hero_section (
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        dto.eyebrow_text,
        dto.headline_1,
        dto.headline_2,
        dto.description,
        dto.primary_button_text,
        dto.primary_button_url,
        dto.secondary_button_text,
        dto.secondary_button_url,
      ],
    );

    return {
      success: true,
      message: 'Pricing hero section created successfully.',
    };
  }

  async findHero() {
    const [rows] = await this.db.execute<PriceHeroSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url,
      created_at,
      updated_at
    FROM pricing_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Price hero section not found.');
    }

    return {
      success: true,
      data: rows[0],
    };
  }

  async updateHero(dto: UpdatePricingHeroDto) {
    const [rows] = await this.db.execute<PriceHeroSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url
    FROM pricing_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Price hero section not found.');
    }

    const hero = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
    UPDATE pricing_hero_section
    SET
      eyebrow_text = ?,
      headline_1 = ?,
      headline_2 = ?,
      description = ?,
      primary_button_text = ?,
      primary_button_url = ?,
      secondary_button_text = ?,
      secondary_button_url = ?
    WHERE id = UUID_TO_BIN(?)
    `,
      [
        dto.eyebrow_text ?? hero.eyebrow_text,
        dto.headline_1 ?? hero.headline_1,
        dto.headline_2 ?? hero.headline_2,
        dto.description ?? hero.description,
        dto.primary_button_text ?? hero.primary_button_text,
        dto.primary_button_url ?? hero.primary_button_url,
        dto.secondary_button_text ?? hero.secondary_button_text,
        dto.secondary_button_url ?? hero.secondary_button_url,
        hero.id,
      ],
    );

    return {
      success: true,
      message: 'Price hero section updated successfully.',
    };
  }

  async removeHero() {
    const [rows] = await this.db.execute<PriceHeroSection[]>(
      `
    SELECT id
    FROM pricing_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Price hero section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    DELETE FROM pricing_hero_section
    LIMIT 1
    `,
    );

    return {
      success: true,
      message: 'Price hero section deleted successfully.',
    };
  }

  // ============================================================
  // Pricing Hero Trust
  // ============================================================

  async createTrust(dto: CreatePricingTrustDto) {
    const [existing] = await this.db.execute<PricingHeroTrust[]>(
      `
      SELECT id
      FROM pricing_hero_trust
      WHERE label = ?
      LIMIT 1
    `,
      [dto.label],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Pricing hero trust label already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO pricing_hero_trust (
        label,
        display_order
      )
      VALUES (?, ?)
    `,
      [dto.label, dto.display_order],
    );

    return {
      success: true,
      message: 'Pricing hero trust created successfully.',
    };
  }

  async findAllTrust() {
    const [rows] = await this.db.execute<PricingHeroTrust[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        display_order,
        created_at,
        updated_at
      FROM pricing_hero_trust
      ORDER BY created_at DESC
    `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateTrust(id: string, dto: UpdatePricingTrustDto) {
    const [rows] = await this.db.execute<PricingHeroTrust[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        display_order
      FROM pricing_hero_trust
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
    `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Pricing hero trust not found.');
    }

    const trust = rows[0];

    // Check duplicate label
    if (dto.label && dto.label !== trust.label) {
      const [duplicate] = await this.db.execute<PricingHeroTrust[]>(
        `
        SELECT id
        FROM pricing_hero_trust
        WHERE label = ?
          AND id != UUID_TO_BIN(?)
        LIMIT 1
      `,
        [dto.label, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException(
          'Pricing hero trust label already exists.',
        );
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE pricing_hero_trust
      SET
        label = ?,
        display_order = ?
      WHERE id = UUID_TO_BIN(?)
    `,
      [dto.label ?? trust.label, dto.display_order ?? trust.display_order, id],
    );

    return {
      success: true,
      message: 'Pricing hero trust updated successfully.',
    };
  }

  async removeTrust(id: string) {
    const [rows] = await this.db.execute<PricingHeroTrust[]>(
      `
      SELECT id
      FROM pricing_hero_trust
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
    `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Pricing hero trust not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM pricing_hero_trust
      WHERE id = UUID_TO_BIN(?)
    `,
      [id],
    );

    return {
      success: true,
      message: 'Pricing hero trust deleted successfully.',
    };
  }
}
