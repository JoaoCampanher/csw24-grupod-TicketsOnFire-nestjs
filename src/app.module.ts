import { Module } from '@nestjs/common';
import { SampleModule } from './sample/sample.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { TransactionModule } from './transaction/transaction.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [
    // SampleModule,
    TenantModule,
    UserModule,
    EventModule,
    TicketModule,
    TransactionModule,
    PreferencesModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
