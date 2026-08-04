import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { StatCounter } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';

import { CreateStatCounterDto } from './dto/create-stat-counter.dto';
import { UpdateStatCounterDto } from './dto/update-stat-counter.dto';

@Injectable()
export class StatCounterService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateStatCounterDto) {
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

  async findAll() {
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

  async update(id: string, dto: UpdateStatCounterDto) {
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

  async remove(id: string) {
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
