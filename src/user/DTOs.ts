import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'Jeffferson' })
  nome: string;
  @ApiProperty({ example: 'jefferson@jeff.com' })
  email: string;
  @ApiProperty({ example: 1 })
  tenantId: number;
}
