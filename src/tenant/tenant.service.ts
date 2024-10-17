import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTenantDTO } from './DTOs';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant(createTenantDTO: CreateTenantDTO) {
    return this.prisma.tenant.create({
      data: {
        Nome: createTenantDTO.nome,
        ConfiguracoesEspecificas: createTenantDTO.configuracoesEspecificas,
        InformacoesDeContato: createTenantDTO.informacoesDeContato,
      },
    });
  }

  async deleteTenant(id: number) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: {
        TenantID: Number(id),
      },
    });
    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }
    return this.prisma.tenant.delete({
      where: { TenantID: Number(id) },
    });
  }

  async getTenant(id: number) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: {
        TenantID: Number(id),
      },
    });
    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }
    return this.prisma.tenant.findUnique({
      where: { TenantID: Number(id) },
    });
  }
}
