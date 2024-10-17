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
  @ApiProperty({ example: 'Music Concert' })
  nomeDoEvento: string;

  @ApiProperty({ example: 'Concert' })
  tipo: string;

  @ApiProperty({ example: '123 Main St, Cityville' })
  localizacao: string;

  @ApiProperty({ example: '2024-12-01T20:00:00.000Z' })
  dataEHora: Date;
}
