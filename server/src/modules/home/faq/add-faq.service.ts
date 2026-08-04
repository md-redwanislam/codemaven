import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { Add_FAQ } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateAddFAQDto } from './dto/create-add-faq.dto';
import { UpdateAddFAQDto } from './dto/update-add-faq.dto';

@Injectable()
export class AddFaqService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateAddFAQDto) {
    const [existing] = await this.db.execute<Add_FAQ[]>(
      `
      SELECT id
      FROM ADD_FAQ
      WHERE question = ?
      LIMIT 1
      `,
      [dto.question],
    );

    if (existing.length > 0) {
      throw new BadRequestException('FAQ with this question already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO ADD_FAQ
      (
        question,
        answer
      )
      VALUES
      (?, ?)
      `,
      [dto.question, dto.answer],
    );

    return {
      success: true,
      message: 'FAQ added successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<Add_FAQ[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        question,
        answer,
        created_at,
        updated_at
      FROM ADD_FAQ
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateAddFAQDto) {
    const [rows] = await this.db.execute<Add_FAQ[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        question,
        answer
      FROM ADD_FAQ
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('FAQ not found.');
    }

    const faq = rows[0];

    if (dto.question && dto.question !== faq.question) {
      const [duplicate] = await this.db.execute<Add_FAQ[]>(
        `
        SELECT id
        FROM ADD_FAQ
        WHERE question = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.question, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('FAQ with this question already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE ADD_FAQ
      SET
        question = ?,
        answer = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.question ?? faq.question, dto.answer ?? faq.answer, id],
    );

    return {
      success: true,
      message: 'FAQ updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<Add_FAQ[]>(
      `
      SELECT id
      FROM ADD_FAQ
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
      DELETE FROM ADD_FAQ
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
