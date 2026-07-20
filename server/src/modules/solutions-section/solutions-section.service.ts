import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import type { SolutionsSection } from '../../common/interfaces';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CreateSolutionsSectionDto } from './dto/create-solutions-section.dto';
import { UpdateSolutionsSectionDto } from './dto/update-solutions-section.dto';

@Injectable()
export class SolutionsSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateSolutionsSectionDto) {
    const [existing] = await this.db.execute<SolutionsSection[]>(
      `
      SELECT id
      FROM solutions_section
      WHERE heading = ?
      LIMIT 1
      `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Solutions section item already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO solutions_section
      (
        eyebrow_text,
        heading
      )
      VALUES
      (?, ?)
      `,
      [dto.eyebrow_text, dto.heading],
    );

    return {
      success: true,
      message: 'Solutions section item created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<SolutionsSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        created_at,
        updated_at
      FROM solutions_section
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateSolutionsSectionDto) {
    const [rows] = await this.db.execute<SolutionsSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading
      FROM solutions_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Solutions section item not found.');
    }

    const section = rows[0];

    if (dto.heading && dto.heading !== section.heading) {
      const [duplicate] = await this.db.execute<SolutionsSection[]>(
        `
          SELECT id
          FROM solutions_section
          WHERE heading = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Solutions section item already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE solutions_section
      SET
        eyebrow_text = ?,
        heading = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? section.eyebrow_text,
        dto.heading ?? section.heading,
        id,
      ],
    );

    return {
      success: true,
      message: 'Solutions section item updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<SolutionsSection[]>(
      `
      SELECT id
      FROM solutions_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Solutions section item not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM solutions_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Solutions section item deleted successfully.',
    };
  }
}
