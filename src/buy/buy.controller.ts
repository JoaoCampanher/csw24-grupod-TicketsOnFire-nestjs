import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyService } from './buy.service';
import { BuyTicketDto } from './DTOs';

@Controller('buy')
@ApiTags('Buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Get('getAllEvents/:tenantId')
  async getAllEvents(@Param('tenantId') tenantId: number) {
    return this.buyService.getAllEvents(tenantId);
  }

  @Get('getAvailableTickets/:eventId')
  async getAvailableTickets(@Param('eventId') eventId: number) {
    return this.buyService.getAvailableTickets(eventId);
  }

  @Post('buyTicket')
  async buyTicket(@Body() BuyTicketDto: BuyTicketDto) {
    return this.buyService.buyTicket(BuyTicketDto);
  }
}
