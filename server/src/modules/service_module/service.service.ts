import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ServiceModuleSection } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateServiceModuleSectionDto } from './dto/create-service.dto';
import { UpdateServiceModuleSectionDto } from './dto/update-service.dto';

@Injectable()
export class ServiceModuleSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dto: CreateServiceModuleSectionDto,
    files: {
      thumbnail?: Express.Multer.File[];
      featured_image?: Express.Multer.File[];
    },
  ) {
    const [existing] = await this.db.execute<ServiceModuleSection[]>(
      `
        SELECT id
        FROM service_module_section
        WHERE slug = ?
        LIMIT 1
        `,
      [dto.slug],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Service module section already exists.');
    }

    if (!files.thumbnail?.[0]) {
      throw new BadRequestException('Thumbnail image is required.');
    }

    if (!files.featured_image?.[0]) {
      throw new BadRequestException('Featured image is required.');
    }

    const thumbnailUpload = await this.cloudinaryService.uploadImage(
      files.thumbnail[0],
      'service-module-section',
    );

    const featuredUpload = await this.cloudinaryService.uploadImage(
      files.featured_image[0],
      'service-module-section',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO service_module_section
      (
        title,
        slug,
        display_number,
        icon_label,
        summary,
        description,
        thumbnail,
        t_public_id,
        featured_image,
        f_public_id,
        display_order
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        dto.title,
        dto.slug,
        Number(dto.display_number),
        dto.icon_label,
        dto.summary,
        dto.description,
        thumbnailUpload.url,
        thumbnailUpload.publicId,
        featuredUpload.url,
        featuredUpload.publicId,
        Number(dto.display_order),
      ],
    );

    return {
      success: true,
      message: 'Service module section created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<ServiceModuleSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          title,
          slug,
          display_number,
          icon_label,
          summary,
          description,
          thumbnail,
          featured_image,
          display_order,
          created_at,
          updated_at
        FROM service_module_section
        ORDER BY display_order ASC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async update(
    id: string,
    dto: UpdateServiceModuleSectionDto,
    files?: {
      thumbnail?: Express.Multer.File[];
      featured_image?: Express.Multer.File[];
    },
  ) {
    const [rows] = await this.db.execute<ServiceModuleSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          title,
          slug,
          display_number,
          icon_label,
          summary,
          description,
          thumbnail,
          t_public_id,
          featured_image,
          f_public_id,
          display_order
        FROM service_module_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Service module section not found.');
    }

    const section = rows[0];

    if (dto.slug && dto.slug !== section.slug) {
      const [duplicate] = await this.db.execute<ServiceModuleSection[]>(
        `
          SELECT id
          FROM service_module_section
          WHERE slug = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.slug, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Service module section already exists.');
      }
    }

    let thumbnail = section.thumbnail;
    let tPublicId = section.t_public_id;

    let featuredImage = section.featured_image;
    let fPublicId = section.f_public_id;

    if (files?.thumbnail?.[0]) {
      const uploaded = await this.cloudinaryService.uploadImage(
        files.thumbnail[0],
        'service-module-section',
      );

      thumbnail = uploaded.url;
      tPublicId = uploaded.publicId;

      if (section.t_public_id) {
        await this.cloudinaryService.deleteImage(section.t_public_id);
      }
    }

    if (files?.featured_image?.[0]) {
      const uploaded = await this.cloudinaryService.uploadImage(
        files.featured_image[0],
        'service-module-section',
      );

      featuredImage = uploaded.url;
      fPublicId = uploaded.publicId;

      if (section.f_public_id) {
        await this.cloudinaryService.deleteImage(section.f_public_id);
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE service_module_section
      SET
        title = ?,
        slug = ?,
        display_number = ?,
        icon_label = ?,
        summary = ?,
        description = ?,
        thumbnail = ?,
        t_public_id = ?,
        featured_image = ?,
        f_public_id = ?,
        display_order = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.title ?? section.title,
        dto.slug ?? section.slug,
        dto.display_number ?? section.display_number,
        dto.icon_label ?? section.icon_label,
        dto.summary ?? section.summary,
        dto.description ?? section.description,
        thumbnail,
        tPublicId,
        featuredImage,
        fPublicId,
        dto.display_order ?? section.display_order,
        id,
      ],
    );

    return {
      success: true,
      message: 'Service module section updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<ServiceModuleSection[]>(
      `
        SELECT
          id,
          t_public_id,
          f_public_id
        FROM service_module_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Service module section not found.');
    }

    const section = rows[0];

    if (section.t_public_id) {
      await this.cloudinaryService.deleteImage(section.t_public_id);
    }

    if (section.f_public_id) {
      await this.cloudinaryService.deleteImage(section.f_public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM service_module_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Service module section deleted successfully.',
    };
  }
}
