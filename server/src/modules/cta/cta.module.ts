import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { CtaController } from './cta.controller';
import { CtaService } from './cta.service';

@Module({
  imports: [DatabaseModule],

  controllers: [CtaController],

  providers: [CtaService],
})
export class CtaModule {}
