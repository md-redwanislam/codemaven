import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { MissionParagraph } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateMissionParagraphDto } from './dto/create-mission_paragraph.dto';
import { UpdateMissionParagraphDto } from './dto/update-mission_paragraph.dto';

@Injectable()
export class MissionParagraphService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateMissionParagraphDto) {
    const [existing] = await this.db.execute<MissionParagraph[]>(
      `
  SELECT id
  FROM mission_paragraph
  WHERE TRIM(paragraph) = TRIM(?)
  LIMIT 1
  `,
      [dto.paragraph],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Mission paragraph already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO mission_paragraph
      (
        paragraph
      )
      VALUES
      (?)
      `,
      [dto.paragraph],
    );

    return {
      success: true,
      message: 'Mission paragraph created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        paragraph,
        created_at,
        updated_at
      FROM mission_paragraph
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateMissionParagraphDto) {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        paragraph
      FROM mission_paragraph
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission paragraph not found.');
    }

    const paragraph = rows[0];

    if (dto.paragraph && dto.paragraph !== paragraph.paragraph) {
      const [duplicate] = await this.db.execute<MissionParagraph[]>(
        `
        SELECT id
        FROM mission_paragraph
        WHERE paragraph = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.paragraph, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Mission paragraph already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE mission_paragraph
      SET
        paragraph = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.paragraph ?? paragraph.paragraph, id],
    );

    return {
      success: true,
      message: 'Mission paragraph updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
      SELECT id
      FROM mission_paragraph
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission paragraph not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM mission_paragraph
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Mission paragraph deleted successfully.',
    };
  }
}
