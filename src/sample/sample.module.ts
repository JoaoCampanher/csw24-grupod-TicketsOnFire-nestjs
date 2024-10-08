import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SampleService, PrismaService],
  controllers: [SampleController],
})
export class SampleModule {}
