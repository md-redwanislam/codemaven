import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import type { FAQ } from '../../common/interfaces';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateFaqDto) {
    const [existing] = await this.db.execute<FAQ[]>(
      `
      SELECT id
      FROM FAQ
      WHERE heading = ?
      LIMIT 1
      `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('FAQ with this heading already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO FAQ
      (
        eyebrow_text,
        heading,
        subtext,
        button_text,
        button_url
      )
      VALUES
      (?, ?, ?, ?, ?)
      `,
      [
        dto.eyebrow_text,
        dto.heading,
        dto.subtext,
        dto.button_text,
        dto.button_url,
      ],
    );

    return {
      success: true,
      message: 'FAQ created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<FAQ[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        subtext,
        button_text,
        button_url,
        created_at,
        updated_at
      FROM FAQ
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateFaqDto) {
    const [rows] = await this.db.execute<FAQ[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        subtext,
        button_text,
        button_url
      FROM FAQ
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('FAQ not found.');
    }

    const faq = rows[0];

    if (dto.heading && dto.heading !== faq.heading) {
      const [duplicate] = await this.db.execute<FAQ[]>(
        `
        SELECT id
        FROM FAQ
        WHERE heading = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('FAQ with this heading already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE FAQ
      SET
        eyebrow_text = ?,
        heading = ?,
        subtext = ?,
        button_text = ?,
        button_url = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? faq.eyebrow_text,
        dto.heading ?? faq.heading,
        dto.subtext ?? faq.subtext,
        dto.button_text ?? faq.button_text,
        dto.button_url ?? faq.button_url,
        id,
      ],
    );

    return {
      success: true,
      message: 'FAQ updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<FAQ[]>(
      `
      SELECT id
      FROM FAQ
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('FAQ not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM FAQ
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'FAQ deleted successfully.',
    };
  }
}
