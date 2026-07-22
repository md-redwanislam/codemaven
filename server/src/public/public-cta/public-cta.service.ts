import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import type { CTA } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';

@Injectable()
export class PublicCtaService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}
  async findAll() {
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

    if (!rows.length) {
      return {
        success: false,
        message: 'No data found.',
      };
    }

    return {
      success: true,
      message: 'Hero section retrieved successfully.',
      data: rows[0],
    };
  }
}
