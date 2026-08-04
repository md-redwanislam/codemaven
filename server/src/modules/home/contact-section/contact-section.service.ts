import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { ContactSection } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateContactSectionDto } from './dto/create-contact-section.dto';
import { UpdateContactSectionDto } from './dto/update-contact-section.dto';

@Injectable()
export class ContactSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateContactSectionDto) {
    const [existing] = await this.db.execute<ContactSection[]>(
      `
        SELECT id
        FROM contact_section
        WHERE heading = ?
        LIMIT 1
        `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Contact section item already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO contact_section
      (
        eyebrow_text,
        heading,
        description
      )
      VALUES
      (?, ?, ?)
      `,
      [dto.eyebrow_text, dto.heading, dto.description],
    );

    return {
      success: true,
      message: 'Contact section item created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<ContactSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          eyebrow_text,
          heading,
          description,
          created_at,
          updated_at
        FROM contact_section
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdateContactSectionDto) {
    const [rows] = await this.db.execute<ContactSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          eyebrow_text,
          heading,
          description
        FROM contact_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Contact section item not found.');
    }

    const section = rows[0];

    if (dto.heading && dto.heading !== section.heading) {
      const [duplicate] = await this.db.execute<ContactSection[]>(
        `
          SELECT id
          FROM contact_section
          WHERE heading = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Contact section item already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE contact_section
      SET
        eyebrow_text = ?,
        heading = ?,
        description = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? section.eyebrow_text,
        dto.heading ?? section.heading,
        dto.description ?? section.description,
        id,
      ],
    );

    return {
      success: true,
      message: 'Contact section item updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<ContactSection[]>(
      `
        SELECT id
        FROM contact_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Contact section item not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM contact_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Contact section item deleted successfully.',
    };
  }
}
