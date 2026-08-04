import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';
import { ContactSectionController } from './contact-section.controller';
import { ContactSectionService } from './contact-section.service';

@Module({
  exports: [ContactSectionService],
  imports: [DatabaseModule],

  controllers: [ContactSectionController],

  providers: [ContactSectionService],
})
export class ContactSectionModule {}
