import {
  Controller,
  Patch,
  Post,
  Delete,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SampleService } from './sample.service';
import { CreateSampleDto, UpdateSampleDto } from './DTOs';

@ApiTags('Sample')
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async createSample(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.createSample(createSampleDto.name);
  }

  @Patch()
  async updateSample(@Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.updateSample(updateSampleDto);
  }

  @Delete(':id')
  async deleteSample(@Param('id') id: string) {
    return this.sampleService.deleteSample(id);
  }

  @Get(':id')
  async getSample(@Param('id') id: string) {
    return this.sampleService.getSample(id);
  }
}
