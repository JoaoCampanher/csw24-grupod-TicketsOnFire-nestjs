import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePreferencesDTO, UpdatePreferencesDTO } from './DTOs';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  async createPreferences(@Body() createPreferencesDTO: CreatePreferencesDTO) {
    return this.preferencesService.createPreferences(createPreferencesDTO);
  }

  @Get(':id')
  async getPreferences(@Param('id') id: number) {
    return this.preferencesService.getPreferences(id);
  }

  @Delete(':id')
  async deletePreferences(@Param('id') id: number) {
    return this.preferencesService.deletePreferences(id);
  }

  @Put(':id')
  async updatePreferences(@Body() updatePreferencesDTO: UpdatePreferencesDTO) {
    return this.preferencesService.updatePreferences(updatePreferencesDTO);
  }
}
