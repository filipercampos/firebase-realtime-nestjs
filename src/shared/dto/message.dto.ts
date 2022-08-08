export class MessageDto {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class PostDto {
  id: any;
  message: string;
  constructor(id: any, message: string) {
    this.id = id;
    this.message = message;
  }
}
