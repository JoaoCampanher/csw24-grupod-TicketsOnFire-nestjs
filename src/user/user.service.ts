import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './DTOs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: { TenantID: createUserDTO.tenantId },
    });

    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }
    const emailExists = await this.prisma.usuario.findUnique({
      where: { Email: createUserDTO.email },
    });
    if (emailExists) {
      throw new NotFoundException('Email already exists');
    }
    
    return this.prisma.usuario.create({
      data: {
        Nome: createUserDTO.nome,
        Email: createUserDTO.email,
        TenantID: createUserDTO.tenantId,
      },
    });
  }

  async deleteUser(id: number) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: {
        UserID: Number(id),
      },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.usuario.delete({
      where: { UserID: Number(id) },
    });
  }

  async getUser(id: number) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: {
        UserID: Number(id),
      },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }
}
