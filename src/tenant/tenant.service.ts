import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant() {
    return this.prisma.tenant.create({
      data: {
        Nome: 'teste',
        ConfiguracoesEspecificas: '1',
        InformacoesDeContato: '2',
      },
    });
  }
}
