import { ApiProperty } from '@nestjs/swagger';

export class UseTicketDTO {
  @ApiProperty({ example: 1 })
  ticketId: number;
}

export class RefundTicketDto {
  @ApiProperty({ example: 1 })
  transactionId: number;
}

export class CreateTicketDTO {
  @ApiProperty({ example: 1 })
  eventoId: number;

  @ApiProperty({ example: 1 })
  tenantId: number;

  @ApiProperty({ example: 100.0 })
  precoOriginal: number;

  @ApiProperty({ example: 1 })
  idDoVendedor: number;

  @ApiProperty({ example: 'ABC123' })
  codigoUnicoDeVerificacao: string;
}

export class UpdateTicketDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 150.0 })
  precoOriginal: number;

  @ApiProperty({ example: 'Sold' })
  status: string;

  @ApiProperty({ example: 'XYZ789' })
  codigoUnicoDeVerificacao: string;
}
