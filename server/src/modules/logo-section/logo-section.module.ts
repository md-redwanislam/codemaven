import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { LogoSectionController } from './logo-section.controller';
import { LogoSectionService } from './logo-section.service';

@Module({
  imports: [DatabaseModule],

  controllers: [LogoSectionController],

  providers: [LogoSectionService],
})
export class LogoSectionModule {}
