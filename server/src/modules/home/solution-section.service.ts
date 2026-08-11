import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { IndustryCard, SolutionsSection } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateIndustryCardDto } from './dto/create-industry-card.dto';
import { CreateSolutionsSectionDto } from './dto/create-solutions-section.dto';
import { UpdateIndustryCardDto } from './dto/update-industry-card';
import { UpdateSolutionsSectionDto } from './dto/update-solutions-section.dto';

@Injectable()
export class SolutionsSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Solutions Section
  // ============================================================

  async createSolutionsSection(dto: CreateSolutionsSectionDto) {
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

  async findAllSolutionsSections() {
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

  async updateSolutionsSection(id: string, dto: UpdateSolutionsSectionDto) {
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

  async removeSolutionsSection(id: string) {
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
      DELETE
      FROM solutions_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Solutions section item deleted successfully.',
    };
  }

  // ============================================================
  // Industry Card
  // ============================================================

  async createIndustryCard(
    dto: CreateIndustryCardDto,
    file: Express.Multer.File,
  ) {
    const [existing] = await this.db.execute<IndustryCard[]>(
      `
        SELECT id
        FROM industry_card
        WHERE title = ?
        LIMIT 1
        `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Industry card already exists.');
    }

    if (!file) {
      throw new BadRequestException('Industry card image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'industry-card',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO industry_card
      (
        image,
        public_id,
        title,
        description
      )
      VALUES (?, ?, ?, ?)
      `,
      [url, publicId, dto.title, dto.description],
    );

    return {
      success: true,
      message: 'Industry card created successfully.',
    };
  }

  async findAllIndustryCards() {
    const [rows] = await this.db.execute<IndustryCard[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          image,
          title,
          description,
          created_at,
          updated_at
        FROM industry_card
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateIndustryCard(
    id: string,
    dto: UpdateIndustryCardDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<IndustryCard[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          image,
          public_id,
          title,
          description
        FROM industry_card
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Industry card not found.');
    }

    const card = rows[0];

    if (dto.title && dto.title !== card.title) {
      const [duplicate] = await this.db.execute<IndustryCard[]>(
        `
          SELECT id
          FROM industry_card
          WHERE title = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Industry card already exists.');
      }
    }

    let image = card.image;
    let publicId = card.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'industry-card',
      );

      image = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && card.public_id) {
      await this.cloudinaryService.deleteImage(card.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE industry_card
      SET
        image = ?,
        public_id = ?,
        title = ?,
        description = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        image,
        publicId,
        dto.title ?? card.title,
        dto.description ?? card.description,
        id,
      ],
    );

    return {
      success: true,
      message: 'Industry card updated successfully.',
    };
  }

  async removeIndustryCard(id: string) {
    const [rows] = await this.db.execute<IndustryCard[]>(
      `
        SELECT
          id,
          public_id
        FROM industry_card
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Industry card not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM industry_card
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Industry card deleted successfully.',
    };
  }
}
