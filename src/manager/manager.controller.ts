import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateEventDTO, UpdateEventDTO } from 'src/event/DTOs';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  async createEvent(@Body() createEventDTO: CreateEventDTO) {
    return this.managerService.createEvent(createEventDTO);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    return this.managerService.deleteEvent(id);
  }

  @Put(':id')
  async updateEvent(@Body() updateEventDTO: UpdateEventDTO) {
    return this.managerService.updateEvent(updateEventDTO);
  }
}
