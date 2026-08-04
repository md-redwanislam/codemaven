import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { ChooseUs } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateChooseUsDto } from './dto/create-choose_us.dto';
import { UpdateChooseUsDto } from './dto/update-choose_us.dto';

@Injectable()
export class ChooseUsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateChooseUsDto) {
    const [existing] = await this.db.execute<ChooseUs[]>(
      `
      SELECT id
      FROM choose_us
      WHERE heading = ?
      LIMIT 1
      `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Choose us item already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO choose_us
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
      message: 'Choose us item created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<ChooseUs[]>(
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
      FROM choose_us
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateChooseUsDto) {
    const [rows] = await this.db.execute<ChooseUs[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        subtext,
        button_text,
        button_url
      FROM choose_us
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Choose us item not found.');
    }

    const item = rows[0];

    if (dto.heading && dto.heading !== item.heading) {
      const [duplicate] = await this.db.execute<ChooseUs[]>(
        `
        SELECT id
        FROM choose_us
        WHERE heading = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Choose us item already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE choose_us
      SET
        eyebrow_text = ?,
        heading = ?,
        subtext = ?,
        button_text = ?,
        button_url = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? item.eyebrow_text,
        dto.heading ?? item.heading,
        dto.subtext ?? item.subtext,
        dto.button_text ?? item.button_text,
        dto.button_url ?? item.button_url,
        id,
      ],
    );

    return {
      success: true,
      message: 'Choose us item updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<ChooseUs[]>(
      `
      SELECT id
      FROM choose_us
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Choose us item not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM choose_us
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Choose us item deleted successfully.',
    };
  }
}
