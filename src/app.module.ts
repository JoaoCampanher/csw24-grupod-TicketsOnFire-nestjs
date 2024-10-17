import { Module } from '@nestjs/common';
import { SampleModule } from './sample/sample.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [SampleModule, UserModule, TenantModule, EventModule, TicketModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
