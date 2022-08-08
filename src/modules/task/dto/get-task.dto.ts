import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetTaskDto {
  @IsOptional()
  @ApiProperty()
  name: string;
}
