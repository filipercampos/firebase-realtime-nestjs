import { ApiProperty } from '@nestjs/swagger';

export class PostTaskDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
