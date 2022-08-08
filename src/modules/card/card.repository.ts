import { Injectable } from '@nestjs/common';
import { AbstractFirebaseRepository } from '../../data/abstract-firebase.repository';
import { FirebaseCollectionConst } from './../../constants/firebase_collection.const';
@Injectable()
export class CardRepository extends AbstractFirebaseRepository {
  constructor() {
    super(FirebaseCollectionConst.CARDS);
  }
}
