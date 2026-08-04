import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { WorkProcessSectionStep } from '../../../common/interfaces';
import { DATABASE_CONNECTION } from '../../../database/database.constant';
import { CreateWorkProcessStepDto } from './dto/create-work-process-step.dto';
import { UpdateWorkProcessStepDto } from './dto/update-work-process-step.dto';

@Injectable()
export class WorkProcessStepService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,
  ) {}

  async create(dto: CreateWorkProcessStepDto) {
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

  async findAll() {
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

  async update(id: string, dto: UpdateWorkProcessStepDto) {
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

  async remove(id: string) {
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
