import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import type { LogoSection } from '../../common/interfaces';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CreateLogoSectionDto } from './dto/create-logo-section.dto';
import { UpdateLogoSectionDto } from './dto/update-logo-section.dto';

@Injectable()
export class LogoSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateLogoSectionDto) {
    const [existing] = await this.db.execute<LogoSection[]>(
      `
      SELECT id
      FROM logo_section
      WHERE eyebrow_text = ?
      LIMIT 1
      `,
      [dto.eyebrow_text],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Logo section item already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO logo_section
      (
        eyebrow_text
      )
      VALUES
      (?)
      `,
      [dto.eyebrow_text],
    );

    return {
      success: true,
      message: 'Logo section item created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        created_at,
        updated_at
      FROM logo_section
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateLogoSectionDto) {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text
      FROM logo_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo section item not found.');
    }

    const section = rows[0];

    if (dto.eyebrow_text && dto.eyebrow_text !== section.eyebrow_text) {
      const [duplicate] = await this.db.execute<LogoSection[]>(
        `
          SELECT id
          FROM logo_section
          WHERE eyebrow_text = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.eyebrow_text, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Logo section item already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE logo_section
      SET
        eyebrow_text = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.eyebrow_text ?? section.eyebrow_text, id],
    );

    return {
      success: true,
      message: 'Logo section item updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
      SELECT id
      FROM logo_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo section item not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM logo_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Logo section item deleted successfully.',
    };
  }
}
