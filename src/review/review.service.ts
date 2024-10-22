import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDTO, UpdateReviewDTO } from './DTOs';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(createReviewDTO: CreateReviewDTO) {
    return this.prisma.avaliacao.create({
      data: {
        IdDoVendedor: createReviewDTO.sellerId,
        IdDoComprador: createReviewDTO.buyerId,
        Nota: createReviewDTO.rating,
        Comentario: createReviewDTO.comment,
      },
    });
  }

  async getReview(id: number) {
    const existingReview = await this.prisma.avaliacao.findUnique({
      where: {
        AvaliacaoID: Number(id),
      },
    });
    if (!existingReview) {
      throw new NotFoundException('Avaliação não encontrada');
    }
    return existingReview;
  }

  async deleteReview(id: number) {
    const existingReview = await this.prisma.avaliacao.findUnique({
      where: {
        AvaliacaoID: Number(id),
      },
    });
    if (!existingReview) {
      throw new NotFoundException('Avaliação não encontrada');
    }
    return this.prisma.avaliacao.delete({
      where: { AvaliacaoID: Number(id) },
    });
  }

  async updateReview(updateReviewDTO: UpdateReviewDTO) {
    const existingReview = await this.prisma.avaliacao.findUnique({
      where: {
        AvaliacaoID: Number(updateReviewDTO.id),
      },
    });
    if (!existingReview) {
      throw new NotFoundException('Avaliação não encontrada');
    }
    return this.prisma.avaliacao.update({
      where: { AvaliacaoID: Number(updateReviewDTO.id) },
      data: {
        Nota: updateReviewDTO.rating,
        Comentario: updateReviewDTO.comment,
      },
    });
  }
}
