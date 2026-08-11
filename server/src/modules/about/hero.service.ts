import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AboutHero, HighlightCard, StatCounter } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateHeroDto } from './dto/create-hero.dto';
import { CreateHighlightCardDto } from './dto/create-highlight-card.dto';
import { CreateStatCounterDto } from './dto/create-stat-counter.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateHighlightCardDto } from './dto/update-highlight-card.dto';
import { UpdateStatCounterDto } from './dto/update-stat-counter.dto';

@Injectable()
export class HeroService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Hero Section
  // ============================================================

  async createHero(dto: CreateHeroDto) {
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

  async findAllHeroes() {
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

  async updateHero(id: string, dto: UpdateHeroDto) {
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

  async removeHero(id: string) {
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

  // ============================================================
  // Highlight Card
  // ============================================================

  async createHighlightCard(
    dto: CreateHighlightCardDto,
    file: Express.Multer.File,
  ) {
    const [existing] = await this.db.execute<HighlightCard[]>(
      `
      SELECT id
      FROM highlight_cards
      WHERE title = ?
      LIMIT 1
      `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Highlight card already exists.');
    }

    if (!file) {
      throw new BadRequestException('Icon image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'highlight-card',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO highlight_cards
      (
        icon,
        public_id,
        title,
        subtitle
      )
      VALUES
      (?, ?, ?, ?)
      `,
      [url, publicId, dto.title, dto.subtitle],
    );

    return {
      success: true,
      message: 'Highlight card created successfully.',
    };
  }

  async findAllHighlightCards() {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        icon,
        title,
        subtitle,
        created_at,
        updated_at
      FROM highlight_cards
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateHighlightCard(
    id: string,
    dto: UpdateHighlightCardDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        icon,
        public_id,
        title,
        subtitle
      FROM highlight_cards
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Highlight card not found.');
    }

    const card = rows[0];

    if (dto.title && dto.title !== card.title) {
      const [duplicate] = await this.db.execute<HighlightCard[]>(
        `
        SELECT id
        FROM highlight_cards
        WHERE title = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Highlight card already exists.');
      }
    }

    let icon = card.icon;
    let publicId = card.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'highlight-card',
      );

      icon = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && card.public_id) {
      await this.cloudinaryService.deleteImage(card.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE highlight_cards
      SET
        icon = ?,
        public_id = ?,
        title = ?,
        subtitle = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        icon,
        publicId,
        dto.title ?? card.title,
        dto.subtitle ?? card.subtitle,
        id,
      ],
    );

    return {
      success: true,
      message: 'Highlight card updated successfully.',
    };
  }

  async removeHighlightCard(id: string) {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
      SELECT id, public_id
      FROM highlight_cards
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Highlight card not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM highlight_cards
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Highlight card deleted successfully.',
    };
  }

  // ============================================================
  // Stat Counter
  // ============================================================

  async createStatCounter(dto: CreateStatCounterDto) {
    const [existing] = await this.db.execute<StatCounter[]>(
      `
      SELECT id
      FROM stat_counter
      WHERE label = ?
      LIMIT 1
      `,
      [dto.label],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Stat counter already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO stat_counter
      (
        label,
        label_value
      )
      VALUES
      (?, ?)
      `,
      [dto.label, dto.label_value],
    );

    return {
      success: true,
      message: 'Stat counter created successfully.',
    };
  }

  async findAllStatCounters() {
    const [rows] = await this.db.execute<StatCounter[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        label_value,
        created_at,
        updated_at
      FROM stat_counter
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateStatCounter(id: string, dto: UpdateStatCounterDto) {
    const [rows] = await this.db.execute<StatCounter[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        label_value
      FROM stat_counter
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Stat counter not found.');
    }

    const counter = rows[0];

    if (dto.label && dto.label !== counter.label) {
      const [duplicate] = await this.db.execute<StatCounter[]>(
        `
          SELECT id
          FROM stat_counter
          WHERE label = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.label, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Stat counter already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE stat_counter
      SET
        label = ?,
        label_value = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.label ?? counter.label, dto.label_value ?? counter.label_value, id],
    );

    return {
      success: true,
      message: 'Stat counter updated successfully.',
    };
  }

  async removeStatCounter(id: string) {
    const [rows] = await this.db.execute<StatCounter[]>(
      `
      SELECT id
      FROM stat_counter
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Stat counter not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM stat_counter
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Stat counter deleted successfully.',
    };
  }
}
