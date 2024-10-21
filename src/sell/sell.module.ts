import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SellService, PrismaService],
  controllers: [SellController],
})
export class SellModule {}
