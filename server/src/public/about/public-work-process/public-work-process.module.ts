import { Module } from '@nestjs/common';
import { WorkProcessModule } from '../../../modules/about/work-process/work-process.module';
import { PublicWorkProcessController } from './public-work-process.controller';

@Module({
  imports: [WorkProcessModule],
  controllers: [PublicWorkProcessController],
})
export class PublicWorkProcessModule {}
