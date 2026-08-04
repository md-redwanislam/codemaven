import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { DATABASE_CONNECTION } from '../../../database/database.constant';

import { AboutHero } from '../../../common/interfaces';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateHeroDto) {
    const [existing] = await this.db.execute<AboutHero[]>(
      `
      SELECT id
      FROM about_hero_section
      LIMIT 1
      `,
    );

    if (existing.length > 0) {
      throw new BadRequestException('Hero section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO about_hero_section
      (
        eyebrow_text,
        headline_1,
        headline_2,
        description,
        primary_button_text,
        primary_button_url,
        secondary_button_text,
        secondary_button_url
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
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
      message: 'Hero section created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<AboutHero[]>(
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
      FROM about_hero_section
      LIMIT 1
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateHeroDto) {
    const [rows] = await this.db.execute<AboutHero[]>(
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
      FROM about_hero_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Hero section not found.');
    }

    const hero = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE about_hero_section
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
        id,
      ],
    );

    return {
      success: true,
      message: 'Hero section updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<AboutHero[]>(
      `
      SELECT id
      FROM about_hero_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Hero section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM about_hero_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Hero section deleted successfully.',
    };
  }
}
