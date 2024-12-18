import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty({ example: 'Music Concert' })
  nomeDoEvento: string;

  @ApiProperty({ example: 'Concert' })
  tipo: string;

  @ApiProperty({ example: '123 Main St, Cityville' })
  localizacao: string;

  @ApiProperty({ example: '2024-12-01T20:00:00.000Z' })
  dataEHora: Date;

  @ApiProperty({ example: 1 })
  tenantId: number;
}

export class UpdateEventDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Music Concert' })
  nomeDoEvento: string;

  @ApiProperty({ example: 'Concert' })
  tipo: string;

  @ApiProperty({ example: '123 Main St, Cityville' })
  localizacao: string;

  @ApiProperty({ example: '2024-12-01T20:00:00.000Z' })
  dataEHora: Date;
}

export class BuyTicketDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 2 })
  ticketId: number;
}
