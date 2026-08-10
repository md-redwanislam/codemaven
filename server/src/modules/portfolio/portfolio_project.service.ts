import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { PortfolioProject } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreatePortfolioProjectDto } from './dto/create-portfolio_project.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio_project.dto';

@Injectable()
export class PortfolioProjectService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreatePortfolioProjectDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Cover image is required.');
    }

    const { url, publicId } = await this.cloudinaryService.uploadImage(
      file,
      'portfolio/projects',
    );

    await this.db.execute<ResultSetHeader>(
      `
        INSERT INTO portfolio_projects (
          title,
          slug,
          category,
          card_shape,
          description,
          cover_image,
          public_id,
          tags,
          services,
          display_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        dto.title,
        dto.slug,
        dto.category,
        dto.card_shape,
        dto.description,
        url,
        publicId,
        JSON.stringify(dto.tags),
        dto.services,
        dto.display_order,
      ],
    );

    return {
      success: true,
      message: 'Portfolio project created successfully.',
    };
  }

  async findAll() {
    const [rows] = await this.db.execute<PortfolioProject[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        title,
        slug,
        category,
        card_shape,
        description,
        cover_image,
        public_id,
        tags,
        services,
        display_order,
        created_at,
        updated_at
      FROM portfolio_projects
      ORDER BY created_at DESC
    `,
    );

    const data = rows.map((row) => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
    }));

    return {
      success: true,
      data,
    };
  }

  async update(
    id: string,
    dto: UpdatePortfolioProjectDto,
    file?: Express.Multer.File,
  ) {
    const [rows] = await this.db.execute<PortfolioProject[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          title,
          slug,
          category,
          card_shape,
          description,
          cover_image,
          public_id,
          tags,
          services,
          display_order
        FROM portfolio_projects
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio project not found.');
    }

    const project = rows[0];

    let coverImage = project.cover_image;
    let publicId = project.public_id;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        file,
        'portfolio/projects',
      );

      coverImage = uploadedImage.url;
      publicId = uploadedImage.publicId;

      if (project.public_id) {
        await this.cloudinaryService.deleteImage(project.public_id);
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
        UPDATE portfolio_projects
        SET
          title = ?,
          slug = ?,
          category = ?,
          card_shape = ?,
          description = ?,
          cover_image = ?,
          public_id = ?,
          tags = ?,
          services = ?,
          display_order = ?
        WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.title ?? project.title,
        dto.slug ?? project.slug,
        dto.category ?? project.category,
        dto.card_shape ?? project.card_shape,
        dto.description ?? project.description,
        coverImage,
        publicId,
        dto.tags !== undefined ? JSON.stringify(dto.tags) : project.tags,
        dto.services ?? project.services,
        dto.display_order ?? project.display_order,
        id,
      ],
    );

    return {
      success: true,
      message: 'Portfolio project updated successfully.',
    };
  }

  async remove(id: string) {
    const [rows] = await this.db.execute<PortfolioProject[]>(
      `
        SELECT
          id,
          public_id
        FROM portfolio_projects
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio project not found.');
    }

    if (rows[0].public_id) {
      await this.cloudinaryService.deleteImage(rows[0].public_id);
    }

    await this.db.execute<ResultSetHeader>(
      `
        DELETE FROM portfolio_projects
        WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Portfolio project deleted successfully.',
    };
  }
}
