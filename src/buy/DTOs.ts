import { ApiProperty } from '@nestjs/swagger';

export class BuyTicketDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 2 })
  ticketId: number;
}
