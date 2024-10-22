import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicketDTO, UpdateTicketDTO, UseTicketDTO } from './DTOs';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async useTicket(@Body() useTicketDTO: UseTicketDTO) {
    return this.ticketService.useTicket(useTicketDTO);
  }

  @Post()
  async createTicket(@Body() createTicketDTO: CreateTicketDTO) {
    return this.ticketService.createTicket(createTicketDTO);
  }

  @Get(':id')
  async getTicket(@Param('id') id: number) {
    return this.ticketService.getTicket(id);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: number) {
    return this.ticketService.deleteTicket(id);
  }

  @Put(':id')
  async updateTicket(
    @Param('id') id: number,
    @Body() updateTicketDTO: UpdateTicketDTO,
  ) {
    return this.ticketService.updateTicket(id, updateTicketDTO);
  }
}
