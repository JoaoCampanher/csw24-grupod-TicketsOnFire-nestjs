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

  async updateTransaction(updateTransactionDTO: UpdateTransactionDTO) {
    const existingTransaction = await this.prisma.transacao.findUnique({
      where: {
        TransacaoID: Number(updateTransactionDTO.id),
      },
    });
    if (!existingTransaction) {
      throw new NotFoundException('Transação não encontrada');
    }
    return this.prisma.transacao.update({
      where: { TransacaoID: Number(updateTransactionDTO.id) },
      data: {
        PrecoDeVenda: updateTransactionDTO.salePrice,
        StatusDaTransacao: updateTransactionDTO.transactionStatus,
      },
    });
  }

  async getBalance(userId: number) {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        IDDoVendedor: Number(userId),
      },
      include: {
        transacao: true,
      },
    });
    let balance = 0;
    console
    tickets.forEach((t) => {
      if (!t.transacao || t.transacao.StatusDaTransacao !== 'SUCCESS') {
        return;
      }
      balance += t.transacao.PrecoDeVenda;
    });

    const paidTransactions = await this.prisma.transacao.findMany({
      where: {
        IDDoComprador: Number(userId),
      },
    });
    console.log(balance, JSON.stringify(paidTransactions));
    paidTransactions.forEach((t) => {
      if (t.StatusDaTransacao !== 'SUCCESS') {
        return;
      }
      balance -= t.PrecoDeVenda;
    });
    console.log(balance);
    return { balance };
  }
}
