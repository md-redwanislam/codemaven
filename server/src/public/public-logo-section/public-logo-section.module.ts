import { Module } from '@nestjs/common';

import { LogoSectionModule } from '../../modules/logo-section/logo-section.module';
import { PublicLogoSectionController } from './public-logo-section.controller';

@Module({
  imports: [LogoSectionModule],
  controllers: [PublicLogoSectionController],
})
export class PublicLogoSectionModule {}
