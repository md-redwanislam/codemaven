import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../../cloudinary/cloudinary.service';

import { HighlightCard } from '../../../common/interfaces';

import { DATABASE_CONNECTION } from '../../../database/database.constant';

import { CreateHighlightCardDto } from './dto/create-highlight-card.dto';
import { UpdateHighlightCardDto } from './dto/update-highlight-card.dto';

@Injectable()
export class HighlightCardService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateHighlightCardDto, file: Express.Multer.File) {
    const [existing] = await this.db.execute<HighlightCard[]>(
      `
        SELECT id
        FROM highlight_cards
        WHERE title = ?
        LIMIT 1
        `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Highlight card already exists.');
    }

    if (!file) {
      throw new BadRequestException('Icon image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'highlight-card',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO highlight_cards
      (
        icon,
        public_id,
        title,
        subtitle
      )
      VALUES
      (?, ?, ?, ?)
      `,
      [url, publicId, dto.title, dto.subtitle],
    );

    return {
      success: true,
      message: 'Highlight card created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          icon,
          title,
          subtitle,
          created_at,
          updated_at
        FROM highlight_cards
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
    dto: UpdateHighlightCardDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          icon,
          public_id,
          title,
          subtitle
        FROM highlight_cards
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Highlight card not found.');
    }

    const card = rows[0];

    if (dto.title && dto.title !== card.title) {
      const [duplicate] = await this.db.execute<HighlightCard[]>(
        `
          SELECT id
          FROM highlight_cards
          WHERE title = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Highlight card already exists.');
      }
    }

    let icon = card.icon;
    let publicId = card.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'highlight-card',
      );

      icon = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && card.public_id) {
      await this.cloudinaryService.deleteImage(card.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE highlight_cards
      SET
        icon = ?,
        public_id = ?,
        title = ?,
        subtitle = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        icon,
        publicId,
        dto.title ?? card.title,
        dto.subtitle ?? card.subtitle,
        id,
      ],
    );

    return {
      success: true,
      message: 'Highlight card updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<HighlightCard[]>(
      `
        SELECT id, public_id
        FROM highlight_cards
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Highlight card not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM highlight_cards
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Highlight card deleted successfully.',
    };
  }
}
