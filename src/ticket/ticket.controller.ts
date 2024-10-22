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
import {
  CreateTicketDTO,
  RefundTicketDto,
  UpdateTicketDTO,
  UseTicketDTO,
} from './DTOs';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('bought/:userId')
  async getBoughtTickets(@Param('userId') userId: number) {
    return this.ticketService.getBoughtTickets(userId);
  }

  @Post('refund')
  async refundTicket(@Body() refundTicketDto: RefundTicketDto) {
    return this.ticketService.refundTicket(refundTicketDto);
  }

  @Post('useTicket')
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

  @Put()
  async updateTicket(@Body() updateTicketDTO: UpdateTicketDTO) {
    return this.ticketService.updateTicket(updateTicketDTO);
  }
}
