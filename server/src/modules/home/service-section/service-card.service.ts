import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../../cloudinary/cloudinary.service';
import { DATABASE_CONNECTION } from '../../../database/database.constant';

import { ServiceCard } from '../../../common/interfaces';

import { CreateServiceCardDto } from './dto/create-service-card.dto';
import { UpdateServiceCardDto } from './dto/update-service-card';

@Injectable()
export class ServiceCardService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateServiceCardDto, file: Express.Multer.File) {
    const [existing] = await this.db.execute<ServiceCard[]>(
      `
      SELECT id
      FROM service_card
      WHERE title = ?
      LIMIT 1
      `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Service card already exists.');
    }

    if (!file) {
      throw new BadRequestException('Image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'service-card',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO service_card
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
      message: 'Service card created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<ServiceCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        image,
        title,
        description,
        created_at,
        updated_at
      FROM service_card
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
    dto: UpdateServiceCardDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<ServiceCard[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        image,
        public_id,
        title,
        description
      FROM service_card
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Service card not found.');
    }

    const card = rows[0];

    if (dto.title && dto.title !== card.title) {
      const [duplicate] = await this.db.execute<ServiceCard[]>(
        `
        SELECT id
        FROM service_card
        WHERE title = ?
          AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Service card already exists.');
      }
    }

    let image = card.image;
    let publicId = card.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'service-card',
      );

      image = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && card.public_id) {
      await this.cloudinaryService.deleteImage(card.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE service_card
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
      message: 'Service card updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<ServiceCard[]>(
      `
      SELECT
        id,
        public_id
      FROM service_card
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Service card not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM service_card
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Service card deleted successfully.',
    };
  }
}
