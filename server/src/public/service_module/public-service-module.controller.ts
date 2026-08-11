import { Controller, Get } from '@nestjs/common';
import { ServiceModuleSectionService } from '../../modules/service_module/service.service';

@Controller('service-module')
export class PublicServiceModuleController {
  constructor(
    private readonly ServiceModuleSectionService: ServiceModuleSectionService,
  ) {}

  @Get()
  findAllStatCounter() {
    return this.ServiceModuleSectionService.findAll();
  }
}
