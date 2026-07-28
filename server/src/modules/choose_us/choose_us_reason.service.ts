import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';

import { ChooseUsReason } from '../../common/interfaces';
import { CreateChooseUsReasonDto } from './dto/create-choose_us_reason.dto';
import { UpdateChooseUsReasonDto } from './dto/update-choose_us_reason.dto';

@Injectable()
export class ChooseUsReasonService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateChooseUsReasonDto, file: Express.Multer.File) {
    const [existing] = await this.db.execute<ChooseUsReason[]>(
      `
    SELECT id
    FROM choose_us_reason
    WHERE title = ?
    LIMIT 1
    `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Choose us reason already exists.');
    }

    if (!file) {
      throw new BadRequestException('Icon image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'choose-us/reason',
    );

    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO choose_us_reason
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
      message: 'Choose us reason created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<ChooseUsReason[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        icon,
        title,
        description,
        created_at,
        updated_at
      FROM choose_us_reason
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
    dto: UpdateChooseUsReasonDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<ChooseUsReason[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          icon,
          public_id,
          title,
          description
        FROM choose_us_reason
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Choose us reason not found.');
    }

    const reason = rows[0];

    if (dto.title && dto.title !== reason.title) {
      const [duplicate] = await this.db.execute<ChooseUsReason[]>(
        `
          SELECT id
          FROM choose_us_reason
          WHERE title = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Choose us reason already exists.');
      }
    }

    let icon = reason.icon;
    let publicId = reason.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'choose-us/reason',
      );
      icon = uploadedImage.url;
      publicId = uploadedImage.publicId;
    }

    if (file && reason.public_id) {
      await this.cloudinaryService.deleteImage(reason.public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
        UPDATE choose_us_reason
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
        dto.title ?? reason.title,
        dto.description ?? reason.description,
        id,
      ],
    );

    return {
      success: true,
      message: 'Choose us reason updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<ChooseUsReason[]>(
      `
      SELECT id, public_id
      FROM choose_us_reason
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Choose us reason not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM choose_us_reason
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Choose us reason deleted successfully.',
    };
  }
}
