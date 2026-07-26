import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { AddLogoController } from './add-logo.controller';
import { AddLogoService } from './add-logo.service';
import { LogoSectionController } from './logo-section.controller';
import { LogoSectionService } from './logo-section.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [LogoSectionController, AddLogoController],

  providers: [LogoSectionService, AddLogoService],
})
export class LogoSectionModule {}
