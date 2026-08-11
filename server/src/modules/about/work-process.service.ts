import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';
import {
  WorkProcessSection,
  WorkProcessSectionStep,
} from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { CreateWorkProcessStepDto } from './dto/create-work-process-step.dto';
import { CreateWorkProcessDto } from './dto/create-work-process.dto';
import { UpdateWorkProcessStepDto } from './dto/update-work-process-step.dto';
import { UpdateWorkProcessDto } from './dto/update-work-process.dto';

@Injectable()
export class WorkProcessService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  // ============================================================
  // Work Process Section
  // ============================================================

  async createWorkProcess(dto: CreateWorkProcessDto) {
    const [existing] = await this.db.execute<WorkProcessSection[]>(
      `
      SELECT id
      FROM work_process_section
      WHERE heading = ?
      LIMIT 1
      `,
      [dto.heading],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Work process section already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO work_process_section
      (
        eyebrow_text,
        heading,
        description
      )
      VALUES
      (?, ?, ?)
      `,
      [dto.eyebrow_text, dto.heading, dto.description],
    );

    return {
      success: true,
      message: 'Work process section created successfully.',
    };
  }

  async findAllWorkProcesses() {
    const [rows] = await this.db.execute<WorkProcessSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        description,
        created_at,
        updated_at
      FROM work_process_section
      ORDER BY created_at DESC
      `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateWorkProcess(id: string, dto: UpdateWorkProcessDto) {
    const [rows] = await this.db.execute<WorkProcessSection[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        eyebrow_text,
        heading,
        description
      FROM work_process_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Work process section not found.');
    }

    const section = rows[0];

    if (dto.heading && dto.heading !== section.heading) {
      const [duplicate] = await this.db.execute<WorkProcessSection[]>(
        `
          SELECT id
          FROM work_process_section
          WHERE heading = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.heading, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Work process section already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE work_process_section
      SET
        eyebrow_text = ?,
        heading = ?,
        description = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [
        dto.eyebrow_text ?? section.eyebrow_text,
        dto.heading ?? section.heading,
        dto.description ?? section.description,
        id,
      ],
    );

    return {
      success: true,
      message: 'Work process section updated successfully.',
    };
  }

  async removeWorkProcess(id: string) {
    const [rows] = await this.db.execute<WorkProcessSection[]>(
      `
      SELECT id
      FROM work_process_section
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Work process section not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM work_process_section
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Work process section deleted successfully.',
    };
  }

  // ============================================================
  // Work Process Step
  // ============================================================

  async createWorkProcessStep(dto: CreateWorkProcessStepDto) {
    const [existing] = await this.db.execute<WorkProcessSectionStep[]>(
      `
        SELECT id
        FROM work_process_section_step
        WHERE title = ?
        LIMIT 1
        `,
      [dto.title],
    );

    if (existing.length > 0) {
      throw new BadRequestException('Work process step already exists.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      INSERT INTO work_process_section_step
      (
        title,
        description
      )
      VALUES
      (?, ?)
      `,
      [dto.title, dto.description],
    );

    return {
      success: true,
      message: 'Work process step created successfully.',
    };
  }

  async findAllWorkProcessSteps() {
    const [rows] = await this.db.execute<WorkProcessSectionStep[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          title,
          description,
          created_at,
          updated_at
        FROM work_process_section_step
        ORDER BY created_at DESC
        `,
    );

    return {
      success: true,
      data: rows,
    };
  }

  async updateWorkProcessStep(id: string, dto: UpdateWorkProcessStepDto) {
    const [rows] = await this.db.execute<WorkProcessSectionStep[]>(
      `
        SELECT
          BIN_TO_UUID(id) AS id,
          title,
          description
        FROM work_process_section_step
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Work process step not found.');
    }

    const step = rows[0];

    if (dto.title && dto.title !== step.title) {
      const [duplicate] = await this.db.execute<WorkProcessSectionStep[]>(
        `
          SELECT id
          FROM work_process_section_step
          WHERE title = ?
          AND id != UUID_TO_BIN(?)
          LIMIT 1
          `,
        [dto.title, id],
      );

      if (duplicate.length > 0) {
        throw new BadRequestException('Work process step already exists.');
      }
    }

    await this.db.execute<ResultSetHeader>(
      `
      UPDATE work_process_section_step
      SET
        title = ?,
        description = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [dto.title ?? step.title, dto.description ?? step.description, id],
    );

    return {
      success: true,
      message: 'Work process step updated successfully.',
    };
  }

  async removeWorkProcessStep(id: string) {
    const [rows] = await this.db.execute<WorkProcessSectionStep[]>(
      `
        SELECT id
        FROM work_process_section_step
        WHERE id = UUID_TO_BIN(?)
        LIMIT 1
        `,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Work process step not found.');
    }

    await this.db.execute<ResultSetHeader>(
      `
      DELETE
      FROM work_process_section_step
      WHERE id = UUID_TO_BIN(?)
      `,
      [id],
    );

    return {
      success: true,
      message: 'Work process step deleted successfully.',
    };
  }
}
