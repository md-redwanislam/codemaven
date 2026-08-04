import { Module } from '@nestjs/common';
import { ServiceModule } from '../../modules/service_module/service/service.module';
import { PublicServiceModuleController } from './public-service-module.controller';

@Module({
  imports: [ServiceModule],
  controllers: [PublicServiceModuleController],
})
export class PublicServiceModule {}
