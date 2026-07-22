import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';
import type { HeroSection } from '../../common/interfaces/index';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateHeroDto) {
    const [existing] = await this.db.execute<HeroSection[]>(
      `
    SELECT id
    FROM hero_section
    LIMIT 1
    `,
    );

    if (existing.length > 0) {
      throw new BadRequestException('Hero section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO hero_section
    (
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url,
      ratings,
      rating_text,
      trust_text
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        dto.headline_1,
        dto.headline_2,
        dto.description,
        dto.primary_button_text,
        dto.primary_button_url,
        dto.secondary_button_text,
        dto.secondary_button_url,
        dto.ratings,
        dto.rating_text,
        dto.trust_text,
      ],
    );

    return {
      success: true,
      message: 'Hero section created successfully.',
    };
  }

  async findOne() {
    const [rows] = await this.db.execute<HeroSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url,
      ratings,
      rating_text,
      trust_text,
      created_at,
      updated_at
    FROM hero_section
    LIMIT 1
    `,
    );
    if (!rows.length) {
      return {
        success: false,
        message: 'No data found.',
      };
    }

    return {
      success: true,
      message: 'Hero section retrieved successfully.',
      data: rows[0],
    };
  }

  async update(id: string, dto: UpdateHeroDto) {
    const [rows] = await this.db.execute<HeroSection[]>(
      `
    SELECT *
    FROM hero_section
    WHERE id = UUID_TO_BIN(?)
    LIMIT 1
    `,
      [id],
    );

    if (!rows.length) {
      throw new NotFoundException('Hero section not found.');
    }

    const hero = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
    UPDATE hero_section
    SET
      headline_1 = ?,
      headline_2 = ?,
      description = ?,
      primary_button_text = ?,
      primary_button_url = ?,
      secondary_button_text = ?,
      secondary_button_url = ?,
      ratings = ?,
      rating_text = ?,
      trust_text = ?
    WHERE id = UUID_TO_BIN(?)
    `,
      [
        dto.headline_1 ?? hero.headline_1,
        dto.headline_2 ?? hero.headline_2,
        dto.description ?? hero.description,
        dto.primary_button_text ?? hero.primary_button_text,
        dto.primary_button_url ?? hero.primary_button_url,
        dto.secondary_button_text ?? hero.secondary_button_text,
        dto.secondary_button_url ?? hero.secondary_button_url,
        dto.ratings ?? hero.ratings,
        dto.rating_text ?? hero.rating_text,
        dto.trust_text ?? hero.trust_text,
        id,
      ],
    );

    return {
      success: true,
      message: 'Hero section updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<HeroSection[]>(
      `
    SELECT id
    FROM hero_section
    WHERE id = UUID_TO_BIN(?)
    LIMIT 1
    `,
      [id],
    );

    if (!rows.length) {
      throw new NotFoundException('Hero section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    DELETE
    FROM hero_section
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
