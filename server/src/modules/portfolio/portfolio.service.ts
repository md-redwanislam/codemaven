import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';

import {
  PortfolioCategory,
  PortfolioHeroSection,
  PortfolioProject,
  PortfolioShowcaseSection,
  PortfolioStateSection,
} from '../../common/interfaces';

import { DATABASE_CONNECTION } from '../../database/database.constant';

import { CreatePortfolioCategoryDto } from './dto/create-portfolio_category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio_category.dto';

import { CreatePortfolioProjectDto } from './dto/create-portfolio_project.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio_project.dto';

import { CreatePortfolioHeroDto } from './dto/create-portfolio_hero.dto';
import { UpdatePortfolioHeroDto } from './dto/update-portfolio_hero.dto';

import { CreatePortfolioShowcaseDto } from './dto/create-portfolio_showcase.dto';
import { UpdatePortfolioShowcaseDto } from './dto/update-portfolio_showcase.dto';

import { CreatePortfolioStateDto } from './dto/create-portfolio_state.dto';
import { UpdatePortfolioStateDto } from './dto/update-portfolio_state.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ============================================================
  // Portfolio Hero
  // ============================================================

  async createHero(dto: CreatePortfolioHeroDto) {
    const [existing] = await this.db.execute<PortfolioHeroSection[]>(
      `
    SELECT id
    FROM portfolio_hero_section
    LIMIT 1
    `,
    );

    if (existing.length > 0) {
      throw new BadRequestException('Portfolio hero section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO portfolio_hero_section (
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        dto.eyebrow_text,
        dto.headline_1,
        dto.headline_2,
        dto.description,
        dto.primary_button_text,
        dto.primary_button_url,
        dto.secondary_button_text,
        dto.secondary_button_url,
      ],
    );

    return {
      success: true,
      message: 'Portfolio hero section created successfully.',
    };
  }

  async findHero() {
    const [rows] = await this.db.execute<PortfolioHeroSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url,
      created_at,
      updated_at
    FROM portfolio_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio hero section not found.');
    }

    return {
      success: true,
      data: rows[0],
    };
  }

  async updateHero(dto: UpdatePortfolioHeroDto) {
    const [rows] = await this.db.execute<PortfolioHeroSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      eyebrow_text,
      headline_1,
      headline_2,
      description,
      primary_button_text,
      primary_button_url,
      secondary_button_text,
      secondary_button_url
    FROM portfolio_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio hero section not found.');
    }

    const hero = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
    UPDATE portfolio_hero_section
    SET
      eyebrow_text = ?,
      headline_1 = ?,
      headline_2 = ?,
      description = ?,
      primary_button_text = ?,
      primary_button_url = ?,
      secondary_button_text = ?,
      secondary_button_url = ?
    WHERE id = UUID_TO_BIN(?)
    `,
      [
        dto.eyebrow_text ?? hero.eyebrow_text,
        dto.headline_1 ?? hero.headline_1,
        dto.headline_2 ?? hero.headline_2,
        dto.description ?? hero.description,
        dto.primary_button_text ?? hero.primary_button_text,
        dto.primary_button_url ?? hero.primary_button_url,
        dto.secondary_button_text ?? hero.secondary_button_text,
        dto.secondary_button_url ?? hero.secondary_button_url,
        hero.id,
      ],
    );

    return {
      success: true,
      message: 'Portfolio hero section updated successfully.',
    };
  }

  async removeHero() {
    const [rows] = await this.db.execute<PortfolioHeroSection[]>(
      `
    SELECT id
    FROM portfolio_hero_section
    LIMIT 1
    `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio hero section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    DELETE FROM portfolio_hero_section
    LIMIT 1
    `,
    );

    return {
      success: true,
      message: 'Portfolio hero section deleted successfully.',
    };
  }

  // ============================================================
  // Portfolio Showcase
  // ============================================================

  async createShowcase(dto: CreatePortfolioShowcaseDto) {
    const [existing] = await this.db.execute<PortfolioShowcaseSection[]>(
      `
      SELECT id
      FROM portfolio_showcase_section
      LIMIT 1
      `,
    );

    if (existing.length > 0) {
      throw new BadRequestException(
        'Portfolio showcase section already exists.',
      );
    }

    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO portfolio_showcase_section (
      eyebrow_text,
      headline_1,
      headline_2,
      description
    )
    VALUES (?, ?, ?, ?)
    `,
      [dto.eyebrow_text, dto.headline_1, dto.headline_2, dto.description],
    );

    return {
      success: true,
      message: 'Portfolio showcase section created successfully.',
    };
  }

  async findShowcase() {
    const [rows] = await this.db.execute<PortfolioShowcaseSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        headline_1,
        headline_2,
        description,
        created_at,
        updated_at
      FROM portfolio_showcase_section
      LIMIT 1
      `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio showcase section not found.');
    }

    return {
      success: true,
      data: rows[0],
    };
  }

  async updateShowcase(dto: UpdatePortfolioShowcaseDto) {
    const [rows] = await this.db.execute<PortfolioShowcaseSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        headline_1,
        headline_2,
        description
      FROM portfolio_showcase_section
      LIMIT 1
      `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio showcase section not found.');
    }

    const showcase = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
    UPDATE portfolio_showcase_section
    SET
      eyebrow_text = ?,
      headline_1 = ?,
      headline_2 = ?,
      description = ?
    WHERE id = UUID_TO_BIN(?)
    `,
      [
        dto.eyebrow_text ?? showcase.eyebrow_text,
        dto.headline_1 ?? showcase.headline_1,
        dto.headline_2 ?? showcase.headline_2,
        dto.description ?? showcase.description,
        showcase.id,
      ],
    );

    return {
      success: true,
      message: 'Portfolio showcase section updated successfully.',
    };
  }

  async removeShowcase() {
    const [rows] = await this.db.execute<PortfolioShowcaseSection[]>(
      `
      SELECT id
      FROM portfolio_showcase_section
      LIMIT 1
      `,
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio showcase section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    DELETE FROM portfolio_showcase_section
    LIMIT 1
    `,
    );

    return {
      success: true,
      message: 'Portfolio showcase section deleted successfully.',
    };
  }

  // ============================================================
  // Portfolio State Counter
  // ============================================================

  async createState(dto: CreatePortfolioStateDto) {
    await this.db.execute<ResultSetHeader>(
      `
    INSERT INTO portfolio_state_section (
      label,
      label_value
    )
    VALUES (?, ?)
    `,
      [dto.label, dto.label_value],
    );

    return {
      success: true,
      message: 'Portfolio state created successfully.',
    };
  }

  async findAllStates() {
    const [rows] = await this.db.execute<PortfolioStateSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      label,
      label_value,
      created_at,
      updated_at
    FROM portfolio_state_section
    ORDER BY created_at DESC
    `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateState(id: string, dto: UpdatePortfolioStateDto) {
    const [rows] = await this.db.execute<PortfolioStateSection[]>(
      `
    SELECT
      BIN_TO_UUID(id) AS id,
      label,
      label_value
    FROM portfolio_state_section
    WHERE id = UUID_TO_BIN(?)
    LIMIT 1
    `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio state not found.');
    }

    const state = rows[0];

    await this.db.execute<ResultSetHeader>(
      `
    UPDATE portfolio_state_section
    SET
      label = ?,
      label_value = ?
    WHERE id = UUID_TO_BIN(?)
    `,
      [dto.label ?? state.label, dto.label_value ?? state.label_value, id],
    );

    return {
      success: true,
      message: 'Portfolio state updated successfully.',
    };
  }

  async removeState(id: string) {
    const [rows] = await this.db.execute<PortfolioStateSection[]>(
      `
    SELECT id
    FROM portfolio_state_section
    WHERE id = UUID_TO_BIN(?)
    LIMIT 1
    `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio state not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
    DELETE FROM portfolio_state_section
    WHERE id = UUID_TO_BIN(?)
    `,
      [id],
    );

    return {
      success: true,
      message: 'Portfolio state deleted successfully.',
    };
  }

  // ============================================================
  // Portfolio Category
  // ============================================================

  async createCategory(dto: CreatePortfolioCategoryDto) {
    const [existing] = await this.db.execute<PortfolioCategory[]>(
      `
      SELECT id
      FROM portfolio_category
      WHERE name = ?
      LIMIT 1
      `,
      [dto.name],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Portfolio category already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO portfolio_category (
        name,
        slug,
        display_order
      )
      VALUES (?, ?, ?)
      `,
      [dto.name, dto.slug, dto.display_order],
    );

    return {
      success: true,
      message: 'Portfolio category created successfully.',
    };
  }

  async findAllCategories() {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        name,
        slug,
        display_order,
        created_at,
        updated_at
      FROM portfolio_category
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateCategory(id: string, dto: UpdatePortfolioCategoryDto) {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        name,
        slug,
        display_order
      FROM portfolio_category
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio category not found.');
    }

    const category = rows[0];

    if (dto.name && dto.name !== category.name) {
      const [duplicate] = await this.db.execute<PortfolioCategory[]>(
        `
          SELECT id
          FROM portfolio_category
          WHERE name = ?
            AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.name, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Portfolio category already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE portfolio_category
      SET
        name = ?,
        slug = ?,
        display_order = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.name ?? category.name,
        dto.slug ?? category.slug,
        dto.display_order ?? category.display_order,
        id,
      ],
    );

    return {
      success: true,
      message: 'Portfolio category updated successfully.',
    };
  }

  async removeCategory(id: string) {
    const [rows] = await this.db.execute<PortfolioCategory[]>(
      `
      SELECT id
      FROM portfolio_category
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Portfolio category not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE FROM portfolio_category
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Portfolio category deleted successfully.',
    };
  }

  // ============================================================
  // Portfolio Project
  // ============================================================

  async createProject(
    dto: CreatePortfolioProjectDto,
    file: Express.Multer.File,
  ) {
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

  async findAllProjects() {
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

  async updateProject(
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

  async removeProject(id: string) {
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
