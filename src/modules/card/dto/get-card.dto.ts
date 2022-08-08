import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCardDto {
  @IsOptional()
  @ApiProperty()
  name: string;
}
