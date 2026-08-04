import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';
import { WorkProcessStepController } from './work-process-step.controller';
import { WorkProcessStepService } from './work-process-step.service';
import { WorkProcessController } from './work-process.controller';
import { WorkProcessService } from './work-process.service';

@Module({
  imports: [DatabaseModule],

  controllers: [WorkProcessController, WorkProcessStepController],

  providers: [WorkProcessService, WorkProcessStepService],

  exports: [WorkProcessService, WorkProcessStepService],
})
export class WorkProcessModule {}
