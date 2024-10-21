import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { PrismaService } from 'src/prisma.service';
import { BuyController } from './buy.controller';

@Module({
  providers: [BuyService, PrismaService],
  controllers: [BuyController],
})
export class BuyModule {}
