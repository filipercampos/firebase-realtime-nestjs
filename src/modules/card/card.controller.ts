import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '../../interfaces/response.message';
import { PostResponseMessage } from './../../interfaces/post-response.message';
import { CardEntity } from './card.entity';
import { CardService } from './card.service';
import { PostCardDto } from './dto/post-card.dto';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  /**
   * Get a card
   */
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'The id of the card' })
  @ApiResponse({
    status: 200,
    description: 'Card data',
    type: CardEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  findById(@Param('id') id: number) {
    return this.cardService.findById(id);
  }

  /**
   * Get all cards
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Card list',
    type: [CardEntity],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  findAll(): Promise<CardEntity[]> {
    return this.cardService.getAll();
  }

  /**
   * Save a card
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Card has been successfully created',
    type: PostResponseMessage,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  async create(@Body() data: PostCardDto) {
    return this.cardService.save(data);
  }

  /**
   * Remove a card
   */
  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'The id of the card' })
  @ApiResponse({
    status: 200,
    description: 'task has been successfully deleted',
    type: ResponseMessage,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  remove(@Param('id') id: number) {
    return this.cardService.remove(id);
  }
}
