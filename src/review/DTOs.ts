import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDTO {
  @ApiProperty({ example: 1 })
  sellerId: number;

  @ApiProperty({ example: 2 })
  buyerId: number;

  @ApiProperty({ example: 5 })
  rating: number;

  @ApiProperty({ example: 'Great transaction, highly recommend!' })
  comment: string;
}

export class UpdateReviewDTO {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 9, maximum: 10, minimum: 0 })
  rating: number;

  @ApiProperty({ example: 'Good transaction but some issues.' })
  comment: string;
}
