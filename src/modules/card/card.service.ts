import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ResponseMessage } from '../../interfaces/response.message';
import { PostResponseMessage } from './../../interfaces/post-response.message';
import { CardEntity } from './card.entity';
import { CardRepository } from './card.repository';
import { PostCardDto } from './dto/post-card.dto';
@Injectable()
export class CardService {
  constructor(private cardRepository: CardRepository) {}
  save(data: PostCardDto): Promise<PostResponseMessage> {
    //TODO mapper or something
    return this.cardRepository.save(data.id, data).then(value => {
      return {
        id: value,
        message: 'Card saved',
      };
    });
  }

  findById(id: number): Promise<CardEntity> {
    //TODO mapper or something
    return this.cardRepository.findBy(id);
  }

  remove(id: number): Promise<ResponseMessage> {
    //TODO mapper or something
    return this.cardRepository.remove(id).then((value: boolean) => {
      if (!value) throw new UnprocessableEntityException('Card not exists');
      return {
        message: 'Card removed',
      };
    });
  }

  getAll(): Promise<CardEntity[]> {
    //Here the data are array format (not object)
    //TODO mapper or something
    return this.cardRepository.findAll();
  }
}
