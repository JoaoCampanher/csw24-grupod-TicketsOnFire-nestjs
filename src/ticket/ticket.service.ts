import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDTO, UpdateTicketDTO, UseTicketDTO } from './DTOs';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async useTicket(useTicketDTO: UseTicketDTO) {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(useTicketDTO.id),
      },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (ticket.Status === 'USED') {
      throw new NotAcceptableException('Ticket already used');
    }
    return this.prisma.ticket.update({
      where: { TicketID: Number(useTicketDTO.id) },
      data: {
        Status: 'USED',
      },
    });
  }

  async createTicket(createTicketDTO: CreateTicketDTO) {
    return this.prisma.ticket.create({
      data: {
        EventoID: createTicketDTO.eventoId,
        TenantID: createTicketDTO.tenantId,
        PrecoOriginal: createTicketDTO.precoOriginal,
        IDDoVendedor: createTicketDTO.idDoVendedor,
        CodigoUnicoDeVerificacao: createTicketDTO.codigoUnicoDeVerificacao,
        Status: 'AVAILABLE',
      },
    });
  }

  async getTicket(id: number) {
    const existingTicket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(id),
      },
    });
    if (!existingTicket) {
      throw new NotFoundException('Ticket not found');
    }
    return existingTicket;
  }

  async deleteTicket(id: number) {
    const existingTicket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(id),
      },
    });
    if (!existingTicket) {
      throw new NotFoundException('Ticket not found');
    }
    return this.prisma.ticket.delete({
      where: { TicketID: Number(id) },
    });
  }

  async updateTicket(id: number, updateTicketDTO: UpdateTicketDTO) {
    const existingTicket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(id),
      },
    });
    if (!existingTicket) {
      throw new NotFoundException('Ticket not found');
    }
    return this.prisma.ticket.update({
      where: { TicketID: Number(id) },
      data: {
        PrecoOriginal: updateTicketDTO.precoOriginal,
        Status: updateTicketDTO.status,
        CodigoUnicoDeVerificacao: updateTicketDTO.codigoUnicoDeVerificacao,
      },
    });
  }
}
