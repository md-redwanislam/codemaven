import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AddLogo, LogoSection } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateAddLogoDto } from './dto/create-add-logo.dto';
import { CreateLogoSectionDto } from './dto/create-logo-section.dto';
import { UpdateAddLogoDto } from './dto/update-add-logo.dto';
import { UpdateLogoSectionDto } from './dto/update-logo-section.dto';

@Injectable()
export class LogoSectionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Logo Section
  // ============================================================

  async createLogoSection(dto: CreateLogoSectionDto) {
    const [existing] = await this.db.execute<LogoSection[]>(
      `
        SELECT id
        FROM logo_section
        WHERE eyebrow_text = ?
        LIMIT 1
        `,
      [dto.eyebrow_text],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Logo section item already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO logo_section
      (
        eyebrow_text
      )
      VALUES
      (?)
      `,
      [dto.eyebrow_text],
    );

    return {
      success: true,
      message: 'Logo section item created successfully.',
    };
  }

  async findAllLogoSections() {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          eyebrow_text,
          created_at,
          updated_at
        FROM logo_section
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateLogoSection(id: string, dto: UpdateLogoSectionDto) {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          eyebrow_text
        FROM logo_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo section item not found.');
    }

    const section = rows[0];

    if (dto.eyebrow_text && dto.eyebrow_text !== section.eyebrow_text) {
      const [duplicate] = await this.db.execute<LogoSection[]>(
        `
          SELECT id
          FROM logo_section
          WHERE eyebrow_text = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.eyebrow_text, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Logo section item already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE logo_section
      SET
        eyebrow_text = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.eyebrow_text ?? section.eyebrow_text, id],
    );

    return {
      success: true,
      message: 'Logo section item updated successfully.',
    };
  }

  async removeLogoSection(id: string) {
    const [rows] = await this.db.execute<LogoSection[]>(
      `
        SELECT id
        FROM logo_section
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo section item not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM logo_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Logo section item deleted successfully.',
    };
  }

  // ============================================================
  // Add Logo
  // ============================================================

  async createLogo(dto: CreateAddLogoDto, file: Express.Multer.File) {
    const [existing] = await this.db.execute<AddLogo[]>(
      `
        SELECT id
        FROM add_logo
        WHERE name = ?
        LIMIT 1
        `,
      [dto.name],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Logo already exists.');
    }

    if (!file) {
      throw new BadRequestException('Logo is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'add-logo',
    );

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO add_logo
      (
        logo,
        public_id,
        name,
        status
      )
      VALUES (?, ?, ?, ?)
      `,
      [url, publicId, dto.name, dto.status],
    );

    return {
      success: true,
      message: 'Logo created successfully.',
    };
  }

  async findAllLogos() {
    const [rows] = await this.db.execute<AddLogo[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          logo,
          name,
          status,
          created_at,
          updated_at
        FROM add_logo
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateLogo(
    id: string,
    dto: UpdateAddLogoDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<AddLogo[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          logo,
          public_id,
          name,
          status
        FROM add_logo
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo not found.');
    }

    const logo = rows[0];

    if (dto.name && dto.name !== logo.name) {
      const [duplicate] = await this.db.execute<AddLogo[]>(
        `
          SELECT id
          FROM add_logo
          WHERE name = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.name, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Logo already exists.');
      }
    }

    let image = logo.logo;
    let publicId = logo.public_id;

    if (file) {
      const uploaded = await this.cloudinaryService.uploadImage(
        file,
        'add-logo',
      );

      image = uploaded.url;
      publicId = uploaded.publicId;
    }

    if (file && logo.public_id) {
      await this.cloudinaryService.deleteImage(logo.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE add_logo
      SET
        logo = ?,
        public_id = ?,
        name = ?,
        status = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [image, publicId, dto.name ?? logo.name, dto.status ?? logo.status, id],
    );

    return {
      success: true,
      message: 'Logo updated successfully.',
    };
  }

  async removeLogo(id: string) {
    const [rows] = await this.db.execute<AddLogo[]>(
      `
        SELECT
          id,
          public_id
        FROM add_logo
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Logo not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM add_logo
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Logo deleted successfully.',
    };
  }
}
