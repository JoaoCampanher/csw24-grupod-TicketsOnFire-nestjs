import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { TransactionModule } from './transaction/transaction.module';
import { PreferencesModule } from './preferences/preferences.module';
import { BuyModule } from './buy/buy.module';
import { SellModule } from './sell/sell.module';
import { ManagerController } from './manager/manager.controller';
import { ManagerModule } from './manager/manager.module';

const modules = [BuyModule, SellModule, ManagerModule];

if (process.env.COMPLETE_CRUD === 'true') {
  modules.push(
    ...[
      TenantModule,
      UserModule,
      EventModule,
      TicketModule,
      TransactionModule,
      PreferencesModule,
    ],
  );
}

@Module({
  imports: modules,
  providers: [],
  controllers: [ManagerController],
})
export class AppModule {}
