import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { ApiTags } from '@nestjs/swagger';
import { BuyTicketDto, CreateEventDTO, UpdateEventDTO } from './DTOs';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('getAllEvents/:tenantId')
  async getAllEvents(@Param('tenantId') tenantId: number) {
    return this.eventService.getAllEvents(tenantId);
  }

  @Get('getAvailableTickets/:eventId')
  async getAvailableTickets(@Param('eventId') eventId: number) {
    return this.eventService.getAvailableTickets(eventId);
  }

  @Post('buyTicket')
  async buyTicket(@Body() BuyTicketDto: BuyTicketDto) {
    return this.eventService.buyTicket(BuyTicketDto);
  }

  @Post()
  async createEvent(@Body() createEventDTO: CreateEventDTO) {
    return this.eventService.createEvent(createEventDTO);
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    return this.eventService.getEvent(id);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Put()
  async updateEvent(@Body() updateEventDTO: UpdateEventDTO) {
    return this.eventService.updateEvent(updateEventDTO);
  }
}
