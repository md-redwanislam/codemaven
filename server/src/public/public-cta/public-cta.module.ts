import { Module } from '@nestjs/common';
import { PublicCtaService } from './public-cta.service';
import { PublicCtaController } from './public-cta.controller';

@Module({
  controllers: [PublicCtaController],
  providers: [PublicCtaService],
})
export class PublicCtaModule {}
