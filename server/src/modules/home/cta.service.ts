import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CTA } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateCtaDto } from './dto/create-cta.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';

@Injectable()
export class CtaService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async createCta(dto: CreateCtaDto) {
    const [existing] = await this.db.execute<CTA[]>(
      `
      SELECT id
      FROM CTA
      LIMIT 1
      `,
    );

    if (existing.length > 0) {
      throw new BadRequestException('CTA section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO CTA
      (
        heading,
        description,
        primary_button_text,
        primary_button_url,
        secondary_button_text,
        secondary_button_url
      )
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
      [
        dto.heading,
        dto.description,
        dto.primary_button_text,
        dto.primary_button_url,
        dto.secondary_button_text,
        dto.secondary_button_url,
      ],
    );

    return {
      success: true,
      message: 'CTA section created successfully.',
    };
  }

  async findCta() {
    const [rows] = await this.db.execute<CTA[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        heading,
        description,
        primary_button_text,
        primary_button_url,
        secondary_button_text,
        secondary_button_url,
        created_at,
        updated_at
      FROM CTA
      LIMIT 1
      `,
    );

    return {
      success: true,
      data: rows[0] ?? null,
    };
  }

  async updateCta(id: string, dto: UpdateCtaDto) {
    const [rows] = await this.db.execute<CTA[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        heading,
        description,
        primary_button_text,
        primary_button_url,
        secondary_button_text,
        secondary_button_url
      FROM CTA
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('CTA section not found.');
    }

    const cta = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE CTA
      SET
        heading = ?,
        description = ?,
        primary_button_text = ?,
        primary_button_url = ?,
        secondary_button_text = ?,
        secondary_button_url = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.heading ?? cta.heading,
        dto.description ?? cta.description,
        dto.primary_button_text ?? cta.primary_button_text,
        dto.primary_button_url ?? cta.primary_button_url,
        dto.secondary_button_text ?? cta.secondary_button_text,
        dto.secondary_button_url ?? cta.secondary_button_url,
        id,
      ],
    );

    return {
      success: true,
      message: 'CTA section updated successfully.',
    };
  }

  async removeCta(id: string) {
    const [rows] = await this.db.execute<CTA[]>(
      `
      SELECT id
      FROM CTA
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('CTA section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM CTA
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'CTA section deleted successfully.',
    };
  }
}
