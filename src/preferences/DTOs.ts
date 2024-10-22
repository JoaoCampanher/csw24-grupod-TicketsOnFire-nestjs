import { ApiProperty } from '@nestjs/swagger';

export class CreatePreferencesDTO {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: true })
  receberEmails: boolean;
}

export class UpdatePreferencesDTO {
  @ApiProperty({ example: 1 })
  preferencesId: number;

  @ApiProperty({ example: true })
  receberEmails: boolean;
}
