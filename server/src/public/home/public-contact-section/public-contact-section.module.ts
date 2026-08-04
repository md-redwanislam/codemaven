import { Module } from '@nestjs/common';

import { ContactSectionModule } from '../../../modules/home/contact-section/contact-section.module';
import { PublicContactSectionController } from './public-contact-section.controller';

@Module({
  imports: [ContactSectionModule],
  controllers: [PublicContactSectionController],
})
export class PublicContactSectionModule {}
