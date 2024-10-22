import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDTO, UpdateTransactionDTO } from './DTOs';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionService.createTransaction(createTransactionDTO);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: number) {
    return this.transactionService.getTransaction(id);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }

  @Put()
  async updateTransaction(@Body() updateTransactionDTO: UpdateTransactionDTO) {
    return this.transactionService.updateTransaction(updateTransactionDTO);
  }
}
