import { ApiProperty } from '@nestjs/swagger';

export class PostCardDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
