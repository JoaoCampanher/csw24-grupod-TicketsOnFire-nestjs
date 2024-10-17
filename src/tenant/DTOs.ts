import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDTO {
  @ApiProperty({ example: 'Casas Bahia ingressos' })
  nome: string;
  @ApiProperty({ example: 'Telefone: (51) 98765-4321' })
  informacoesDeContato: string;
  @ApiProperty({ example: 'Cartão de crédito' })
  configuracoesEspecificas: string;
}
