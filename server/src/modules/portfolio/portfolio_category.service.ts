import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { PortfolioCategory } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio_category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio_category.dto';

@Injectable()
export class PortfolioCategoryService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreatePortfolioCategoryDto) {
    const [existing] = await this.db.execute<PortfolioCategory[]>(
      `
        SELECT id
        FROM portfolio_category
        WHERE name = ?
        LIMIT 1
      `,
      [dto.name],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Portfolio category already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
        INSERT INTO portfolio_category (
          name,
          slug,
          display_order
        )
        VALUES (?, ?, ?)
      `,
      [dto.name, dto.slug, dto.display_order],
    );

    return {
      success: true,
      message: 'Portfolio category created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          name,
          slug,
          display_order,
          created_at,
          updated_at
        FROM portfolio_category
        ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(id: string, dto: UpdatePortfolioCategoryDto) {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          name,
          slug,
          display_order
        FROM portfolio_category
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio category not found.');
    }

    const category = rows[0];

    if (dto.name && dto.name !== category.name) {
      const [duplicate] = await this.db.execute<PortfolioCategory[]>(
        `
          SELECT id
          FROM portfolio_category
          WHERE name = ?
            AND id != UUID_TO_BIN(?)
          LIMIT 1
        `,
        [dto.name, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Portfolio category already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
        UPDATE portfolio_category
        SET
          name = ?,
          slug = ?,
          display_order = ?
        WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.name ?? category.name,
        dto.slug ?? category.slug,
        dto.display_order ?? category.display_order,
        id,
      ],
    );

    return {
      success: true,
      message: 'Portfolio category updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
        SELECT id
        FROM portfolio_category
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio category not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
        DELETE FROM portfolio_category
        WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Portfolio category deleted successfully.',
    };
  }
}
