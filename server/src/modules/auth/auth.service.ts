import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Pool } from 'mysql2/promise';

import { Admin } from '../../common/interfaces';
import { DATABASE_CONNECTION } from '../../database/database.constant';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Pool,

    private readonly jwtService: JwtService,
  ) {}

  async findAdminByEmail(email: string): Promise<Admin | null> {
    const [rows] = await this.db.execute<Admin[]>(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        email,
        password,
        created_at,
        updated_at
      FROM admins
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );

    return rows.length ? rows[0] : null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.findAdminByEmail(loginDto.email);

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Plain-text password comparison
    if (loginDto.password !== admin.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwtService.signAsync({
      adminId: admin.id,
    });

    return {
      success: true,
      message: 'Login successful',
      token,
    };
  }
}
