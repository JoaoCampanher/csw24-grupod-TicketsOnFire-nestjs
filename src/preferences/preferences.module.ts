import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PreferencesService, PrismaService],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
