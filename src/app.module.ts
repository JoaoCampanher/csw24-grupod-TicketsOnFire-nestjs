import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { TransactionModule } from './transaction/transaction.module';
import { PreferencesModule } from './preferences/preferences.module';
import { ReviewModule } from './review/review.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TenantModule,
    UserModule,
    EventModule,
    TicketModule,
    TransactionModule,
    PreferencesModule,
    ReviewModule,
    HealthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
