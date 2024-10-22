import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BuyTicketDto, CreateEventDTO, UpdateEventDTO } from './DTOs';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEvents(tenantId: number) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: {
        TenantID: Number(tenantId),
      },
    });
    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }
    return this.prisma.evento.findMany({
      where: { TenantID: Number(tenantId) },
    });
  }

  async getAvailableTickets(eventId: number) {
    const existingTenant = await this.prisma.evento.findUnique({
      where: {
        EventoID: Number(eventId),
      },
    });
    if (!existingTenant) {
      throw new NotFoundException('Tenant not found');
    }
    return this.prisma.ticket.findMany({
      where: { TenantID: Number(eventId), Status: 'AVAILABLE' },
    });
  }

  async buyTicket(BuyTicketDto: BuyTicketDto) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        UserID: Number(BuyTicketDto.userId),
      },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ticket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(BuyTicketDto.ticketId),
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.Status !== 'AVAILABLE') {
      throw new NotAcceptableException('Ticket not available');
    }
    this.prisma.$transaction([
      this.prisma.ticket.update({
        where: { TicketID: Number(BuyTicketDto.ticketId) },
        data: {
          Status: 'SOLD',
        },
      }),
      this.prisma.transacao.create({
        data: {
          DataDaTransacao: new Date(),
          StatusDaTransacao: 'SUCCESS',
          PrecoDeVenda: ticket.PrecoOriginal,
          IDDoComprador: BuyTicketDto.userId,
          IDDoTicket: BuyTicketDto.ticketId,
          TenantID: user.tenant.TenantID,
        },
      }),
    ]);
  }

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

  async getEvent(id: number) {
    const existingEvent = await this.prisma.evento.findUnique({
      where: {
        EventoID: Number(id),
      },
    });
    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
    return existingEvent;
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
