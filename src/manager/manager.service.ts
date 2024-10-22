import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDTO, UpdateEventDTO } from 'src/event/DTOs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ManagerService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(createEventDTO: CreateEventDTO) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: { TenantID: createEventDTO.tenantId },
    });

    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }

    return this.prisma.evento.create({
      data: {
        NomeDoEvento: createEventDTO.nomeDoEvento,
        Tipo: createEventDTO.tipo,
        Localizacao: createEventDTO.localizacao,
        DataEHora: createEventDTO.dataEHora,
        TenantID: createEventDTO.tenantId,
      },
    });
  }

  async deleteEvent(id: number) {
    const existingEvent = await this.prisma.evento.findUnique({
      where: {
        EventoID: Number(id),
      },
    });
    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
    return this.prisma.evento.delete({
      where: { EventoID: Number(id) },
    });
  }

  async updateEvent(updateEventDTO: UpdateEventDTO) {
    const existingEvent = await this.prisma.evento.findUnique({
      where: {
        EventoID: Number(updateEventDTO.id),
      },
    });
    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
    return this.prisma.evento.update({
      where: { EventoID: Number(updateEventDTO.id) },
      data: {
        NomeDoEvento: updateEventDTO.nomeDoEvento,
        Tipo: updateEventDTO.tipo,
        Localizacao: updateEventDTO.localizacao,
        DataEHora: updateEventDTO.dataEHora,
      },
    });
  }
}
