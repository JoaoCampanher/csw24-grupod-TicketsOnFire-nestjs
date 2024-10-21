import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDTO } from 'src/ticket/DTOs';

@Injectable()
export class SellService {
  constructor(private readonly prisma: PrismaService) {}
  async createTicket(createTicketDTO: CreateTicketDTO) {
    const event = await this.prisma.evento.findUnique({
      where: {
        EventoID: createTicketDTO.eventoId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const seller = await this.prisma.usuario.findUnique({
      where: {
        UserID: createTicketDTO.idDoVendedor,
      },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return this.prisma.ticket.create({
      data: {
        EventoID: createTicketDTO.eventoId,
        TenantID: createTicketDTO.tenantId,
        PrecoOriginal: createTicketDTO.precoOriginal,
        IDDoVendedor: createTicketDTO.idDoVendedor,
        CodigoUnicoDeVerificacao: createTicketDTO.codigoUnicoDeVerificacao,
        Status: createTicketDTO.status,
      },
    });
  }
}
