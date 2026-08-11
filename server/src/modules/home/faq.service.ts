import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { Add_FAQ, FAQ } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateAddFAQDto } from './dto/create-add-faq.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateAddFAQDto } from './dto/update-add-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  // ============================================================
  // FAQ Section
  // ============================================================

  async createFaq(dto: CreateFaqDto) {
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

  async findAllFaqs() {
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

  async updateFaq(id: string, dto: UpdateFaqDto) {
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

  async removeFaq(id: string) {
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
      DELETE
      FROM FAQ
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'FAQ deleted successfully.',
    };
  }

  // ============================================================
  // FAQ Item
  // ============================================================

  async createFaqItem(dto: CreateAddFAQDto) {
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

  async findAllFaqItems() {
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

  async updateFaqItem(id: string, dto: UpdateAddFAQDto) {
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

  async removeFaqItem(id: string) {
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
      DELETE
      FROM ADD_FAQ
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
