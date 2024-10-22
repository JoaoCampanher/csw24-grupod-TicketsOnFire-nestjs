import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDTO, UpdateReviewDTO } from './DTOs';

@ApiTags('Avaliação')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDTO: CreateReviewDTO) {
    return this.reviewService.createReview(createReviewDTO);
  }

  @Get(':id')
  async getReview(@Param('id') id: number) {
    return this.reviewService.getReview(id);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }

  @Put()
  async updateReview(@Body() updateReviewDTO: UpdateReviewDTO) {
    return this.reviewService.updateReview(updateReviewDTO);
  }
}
