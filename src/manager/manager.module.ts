import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { PrismaService } from 'src/prisma.service';
import { ManagerController } from './manager.controller';

@Module({
  providers: [ManagerService, PrismaService],
  controllers: [ManagerController],
})
export class ManagerModule {}
