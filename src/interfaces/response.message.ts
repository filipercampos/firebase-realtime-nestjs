import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessage {
  @ApiProperty()
  message: string;
}
