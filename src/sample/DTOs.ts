import { ApiProperty } from '@nestjs/swagger';

export class CreateSampleDto {
  @ApiProperty({ example: 'Sample Name' })
  name: string;
}

export class UpdateSampleDto {
  @ApiProperty({ example: 'Sample ID' })
  id: string;

  @ApiProperty({ example: 'Updated Sample Name' })
  nome: string;
}
