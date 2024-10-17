import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDTO, UpdateTransactionDTO } from './DTOs';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(createTransactionDTO: CreateTransactionDTO) {
    return this.prisma.transacao.create({
      data: {
        TenantID: createTransactionDTO.tenantId,
        IDDoComprador: createTransactionDTO.buyerId,
        IDDoTicket: createTransactionDTO.ticketId,
        PrecoDeVenda: createTransactionDTO.salePrice,
        DataDaTransacao: createTransactionDTO.transactionDate,
        StatusDaTransacao: createTransactionDTO.transactionStatus,
      },
    });
  }

  async getTransaction(id: number) {
    const existingTransaction = await this.prisma.transacao.findUnique({
      where: {
        TransacaoID: Number(id),
      },
    });
    if (!existingTransaction) {
      throw new NotFoundException('Transação não encontrada');
    }
    return existingTransaction;
  }

  async deleteTransaction(id: number) {
    const existingTransaction = await this.prisma.transacao.findUnique({
      where: {
        TransacaoID: Number(id),
      },
    });
    if (!existingTransaction) {
      throw new NotFoundException('Transação não encontrada');
    }
    return this.prisma.transacao.delete({
      where: { TransacaoID: Number(id) },
    });
  }

  async updateTransaction(
    id: number,
    updateTransactionDTO: UpdateTransactionDTO,
  ) {
    const existingTransaction = await this.prisma.transacao.findUnique({
      where: {
        TransacaoID: Number(id),
      },
    });
    if (!existingTransaction) {
      throw new NotFoundException('Transação não encontrada');
    }
    return this.prisma.transacao.update({
      where: { TransacaoID: Number(id) },
      data: {
        PrecoDeVenda: updateTransactionDTO.salePrice,
        StatusDaTransacao: updateTransactionDTO.transactionStatus,
      },
    });
  }
}
