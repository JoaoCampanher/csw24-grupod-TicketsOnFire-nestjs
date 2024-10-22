import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateTicketDTO,
  RefundTicketDto,
  UpdateTicketDTO,
  UseTicketDTO,
} from './DTOs';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async getBoughtTickets(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        UserID: Number(userId),
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.transacao.findMany({
      where: {
        IDDoComprador: Number(userId),
        StatusDaTransacao: 'SOLD',
      },
    });
  }

  async refundTicket(useTicketDTO: RefundTicketDto) {
    const transaction = await this.prisma.transacao.findUnique({
      where: {
        TransacaoID: Number(useTicketDTO.transactionId),
      },
      include: {
        comprador: true,
        ticket: true,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.StatusDaTransacao !== 'SUCCESS') {
      throw new NotAcceptableException(
        'For refund, transaction must have been successful',
      );
    }

    return this.prisma.$transaction([
      this.prisma.ticket.update({
        where: { TicketID: Number(transaction.ticket.TicketID) },
        data: {
          Status: 'AVAILABLE',
        },
      }),

      this.prisma.transacao.update({
        where: {
          TransacaoID: Number(useTicketDTO.transactionId),
        },
        data: {
          StatusDaTransacao: 'CANCELLED',
        },
      }),
    ]);
  }

  async useTicket(useTicketDTO: UseTicketDTO) {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        TicketID: Number(useTicketDTO.ticketId),
      },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (ticket.Status === 'USED') {
      throw new NotAcceptableException('Ticket already used');
    }
    return this.prisma.ticket.update({
      where: { TicketID: Number(useTicketDTO.ticketId) },
      data: {
        Status: 'USED',
      },
    });
  }

  async createTicket(createTicketDTO: CreateTicketDTO) {
    const event = await this.prisma.evento.findUnique({
      where: {
        EventoID: createTicketDTO.eventoId,
      },
      include: {
        tenant: true,
      },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        TenantID: createTicketDTO.tenantId,
      },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    const seller = await this.prisma.usuario.findUnique({
      where: {
        UserID: createTicketDTO.idDoVendedor,
      },
      include: {
        tenant: true,
      },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (
      event.tenant.TenantID !== tenant.TenantID ||
      seller.tenant.TenantID !== tenant.TenantID
    ) {
      throw new NotAcceptableException('Tenant mismatch');
    }

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
