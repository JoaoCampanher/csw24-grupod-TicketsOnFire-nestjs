import { ApiProperty } from '@nestjs/swagger';

export class CreatePreferencesDTO {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: true })
  receberEmails: boolean;
}

export class UpdatePreferencesDTO {
  @ApiProperty({ example: true })
  receberEmails: boolean;
}
