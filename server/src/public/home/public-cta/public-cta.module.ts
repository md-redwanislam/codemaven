import { Module } from '@nestjs/common';
import { CtaModule } from '../../../modules/home/cta/cta.module';
import { PublicCtaController } from './public-cta.controller';

@Module({
  imports: [CtaModule],
  controllers: [PublicCtaController],
})
export class PublicCtaModule {}
