import { Controller, Get } from '@nestjs/common';
import { WorkProcessStepService } from '../../../modules/about/work-process/work-process-step.service';
import { WorkProcessService } from '../../../modules/about/work-process/work-process.service';

@Controller('about/work-process')
export class PublicWorkProcessController {
  constructor(
    private readonly workProcessService: WorkProcessService,
    private readonly workProcessStepService: WorkProcessStepService,
  ) {}

  @Get()
  findAllWorkProcess() {
    return this.workProcessService.findAll();
  }
  @Get('step')
  findAllWorkProcessStep() {
    return this.workProcessStepService.findAll();
  }
}
