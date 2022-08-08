import { ApiProperty } from '@nestjs/swagger';

export class PostResponseMessage {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
}
