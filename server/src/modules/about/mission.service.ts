import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { MissionParagraph, MissionSection } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateMissionSectionDto } from './dto/create-mission.dto';
import { CreateMissionParagraphDto } from './dto/create-mission_paragraph.dto';
import { UpdateMissionSectionDto } from './dto/update-mission.dto';
import { UpdateMissionParagraphDto } from './dto/update-mission_paragraph.dto';

@Injectable()
export class MissionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Mission Section
  // ============================================================

  async createMission(dto: CreateMissionSectionDto, file: Express.Multer.File) {
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

  async findAllMissions() {
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

  async updateMission(
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

  async removeMission(id: string) {
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

  // ============================================================
  // Mission Paragraph
  // ============================================================

  async createMissionParagraph(dto: CreateMissionParagraphDto) {
    const [existing] = await this.db.execute<MissionParagraph[]>(
      `
        SELECT id
        FROM mission_paragraph
        WHERE TRIM(paragraph) = TRIM(?)
        LIMIT 1
        `,
      [dto.paragraph],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Mission paragraph already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO mission_paragraph
      (
        paragraph
      )
      VALUES
      (?)
      `,
      [dto.paragraph],
    );

    return {
      success: true,
      message: 'Mission paragraph created successfully.',
    };
  }

  async findAllMissionParagraphs() {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          paragraph,
          created_at,
          updated_at
        FROM mission_paragraph
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateMissionParagraph(id: string, dto: UpdateMissionParagraphDto) {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          paragraph
        FROM mission_paragraph
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission paragraph not found.');
    }

    const paragraph = rows[0];

    if (dto.paragraph && dto.paragraph !== paragraph.paragraph) {
      const [duplicate] = await this.db.execute<MissionParagraph[]>(
        `
          SELECT id
          FROM mission_paragraph
          WHERE TRIM(paragraph) = TRIM(?)
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.paragraph, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Mission paragraph already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE mission_paragraph
      SET
        paragraph = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.paragraph ?? paragraph.paragraph, id],
    );

    return {
      success: true,
      message: 'Mission paragraph updated successfully.',
    };
  }

  async removeMissionParagraph(id: string) {
    const [rows] = await this.db.execute<MissionParagraph[]>(
      `
        SELECT id
        FROM mission_paragraph
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Mission paragraph not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM mission_paragraph
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Mission paragraph deleted successfully.',
    };
  }
}
