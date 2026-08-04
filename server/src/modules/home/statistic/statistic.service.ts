import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import type { Statistic } from '../../../common/interfaces';

import { DATABASE_CONNECTION } from '../../../database/database.constant';

import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateStatisticDto) {
    const [existing] = await this.db.execute<Statistic[]>(
      `
      SELECT id
      FROM statistic
      WHERE label = ?
      LIMIT 1
      `,
      [dto.label],
    );

    if (existing.length > 0) {
      throw new BadRequestException(
        'Statistic with this label already exists.',
      );
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO statistic
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
      message: 'Statistic created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<Statistic[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        label_value,
        created_at,
        updated_at
      FROM statistic
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateStatisticDto) {
    const [rows] = await this.db.execute<Statistic[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        label,
        label_value
      FROM statistic
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Statistic not found.');
    }

    const statistic = rows[0];

    if (dto.label && dto.label !== statistic.label) {
      const [duplicate] = await this.db.execute<Statistic[]>(
        `
          SELECT id
          FROM statistic
          WHERE label = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.label, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException(
          'Statistic with this label already exists.',
        );
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE statistic
      SET
        label = ?,
        label_value = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.label ?? statistic.label,
        dto.label_value ?? statistic.label_value,
        id,
      ],
    );

    return {
      success: true,
      message: 'Statistic updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<Statistic[]>(
      `
      SELECT id
      FROM statistic
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Statistic not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM statistic
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Statistic deleted successfully.',
    };
  }
}
