import { Module } from '@nestjs/common';

import { AboutModule } from '../../modules/about/about.module';
import { PublicAboutController } from './public-about.controller';

@Module({
  imports: [AboutModule],
  controllers: [PublicAboutController],
})
export class PublicAboutModule {}
