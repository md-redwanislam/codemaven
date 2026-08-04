import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../../cloudinary/cloudinary.service';
import { MissionSection } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateMissionSectionDto } from './dto/create-mission.dto';
import { UpdateMissionSectionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateMissionSectionDto, file: Express.Multer.File) {
    const [existing] = await this.db.execute<MissionSection[]>(
      `
      SELECT id
      FROM mission_section
      WHERE heading = ?
      LIMIT 1
      `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Mission section already exists.');
    }

    if (!file) {
      throw new BadRequestException('Section image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'mission/section',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO mission_section
      (
        eyebrow_text,
        heading,
        section_image,
        public_id,
        stat_value,
        stat_label
      )
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
      [
        dto.eyebrow_text,
        dto.heading,
        url,
        publicId,
        dto.stat_value,
        dto.stat_label,
      ],
    );

    return {
      success: true,
      message: 'Mission section created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<MissionSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        section_image,
        stat_value,
        stat_label,
        created_at,
        updated_at
      FROM mission_section
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
    dto: UpdateMissionSectionDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<MissionSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        section_image,
        public_id,
        stat_value,
        stat_label
      FROM mission_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission section not found.');
    }

    const section = rows[0];

    if (dto.heading && dto.heading !== section.heading) {
      const [duplicate] = await this.db.execute<MissionSection[]>(
        `
        SELECT id
        FROM mission_section
        WHERE heading = ?
        AND id != UUID_TO_BIN(?)
        LIMIT 1
        `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Mission section already exists.');
      }
    }

    let sectionImage = section.section_image;
    let publicId = section.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'mission/section',
      );

      sectionImage = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && section.public_id) {
      await this.cloudinaryService.deleteImage(section.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE mission_section
      SET
        eyebrow_text = ?,
        heading = ?,
        section_image = ?,
        public_id = ?,
        stat_value = ?,
        stat_label = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? section.eyebrow_text,
        dto.heading ?? section.heading,
        sectionImage,
        publicId,
        dto.stat_value ?? section.stat_value,
        dto.stat_label ?? section.stat_label,
        id,
      ],
    );

    return {
      success: true,
      message: 'Mission section updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<MissionSection[]>(
      `
      SELECT
        id,
        public_id
      FROM mission_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission section not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM mission_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Mission section deleted successfully.',
    };
  }
}
