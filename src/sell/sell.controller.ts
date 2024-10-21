import { Body, Controller, Post } from '@nestjs/common';
import { CreateTicketDTO } from 'src/ticket/DTOs';
import { SellService } from './sell.service';

@Controller('sell')
export class SellController {
  constructor(private sellService: SellService) {}
  
  @Post()
  async createTicket(@Body() createTicketDTO: CreateTicketDTO) {
    return this.sellService.createTicket(createTicketDTO);
  }
}
