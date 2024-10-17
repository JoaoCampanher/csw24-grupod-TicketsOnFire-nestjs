import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDTO {
  @ApiProperty({ example: 1 })
  tenantId: number;

  @ApiProperty({ example: 1 })
  buyerId: number;

  @ApiProperty({ example: 1 })
  ticketId: number;

  @ApiProperty({ example: 100.0 })
  salePrice: number;

  @ApiProperty({ example: '2024-10-17T10:00:00.000Z' })
  transactionDate: Date;

  @ApiProperty({ example: 'Completed' })
  transactionStatus: string;
}

export class UpdateTransactionDTO {
  @ApiProperty({ example: 150.0 })
  salePrice: number;

  @ApiProperty({ example: 'Refunded' })
  transactionStatus: string;
}
