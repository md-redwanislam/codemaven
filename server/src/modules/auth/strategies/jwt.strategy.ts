import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.authToken,
      ]),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('jwtoken.secretKey'),
    });
  }

  async validate(payload: { adminId: string }) {
    return payload;
  }
}
