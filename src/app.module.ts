import { Module } from '@nestjs/common';
import { SampleModule } from './sample/sample.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [SampleModule, UserModule, TenantModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
