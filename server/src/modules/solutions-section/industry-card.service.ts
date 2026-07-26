import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { DATABASE_CONNECTION } from '../../database/database.constant';

import { IndustryCard } from '../../common/interfaces';

import { CreateIndustryCardDto } from './dto/create-industry-card.dto';
import { UpdateIndustryCardDto } from './dto/update-industry-card';

@Injectable()
export class IndustryCardService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateIndustryCardDto, file: Express.Multer.File) {
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
      throw new BadRequestException('Icon image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'industry-card',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO industry_card
      (
        icon,
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

  async findAll() {
    const [rows] = await this.db.execute<IndustryCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        icon,
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

  async update(
    id: string,
    dto: UpdateIndustryCardDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<IndustryCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        icon,
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

    let icon = card.icon;
    let publicId = card.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'industry-card',
      );

      icon = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && card.public_id) {
      await this.cloudinaryService.deleteImage(card.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE industry_card
      SET
        icon = ?,
        public_id = ?,
        title = ?,
        description = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        icon,
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

  async remove(id: string) {
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
