import { uuidv4 } from '@firebase/util';
import { Logger } from '@nestjs/common';
import 'firebase/database';
import {
  child,
  Database,
  DatabaseReference,
  get,
  getDatabase,
  ref,
  remove,
  set,
} from 'firebase/database';
import { FirebaseException } from './exceptions/firebase.exception';
/**
 * Base Repository firebase realtime
 *
 * The Firebase Realtime Database is a cloud-hosted NoSQL database
 * that lets you store and sync data between your users in realtime
 */
export abstract class AbstractFirebaseRepository {
  private _collection: DatabaseReference;
  private _database: Database;
  private logger: Logger;
  /**
   * @param {string} pathName collection path name
   */
  constructor(pathName: string) {
    this._database = getDatabase();
    this._collection = ref(this._database, pathName);
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Read data object format
   */
  async read(): Promise<any[]> {
    try {
      const snapshot = await get(this._collection);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (err) {
      this.handleFirebaseError('readAll', err);
    }
  }

  /**
   * Save or overwrite a record
   *
   * @returns {uuidv4}
   */
  async write(data: any): Promise<string> {
    //generate key
    const key = uuidv4();
    //create doc ref
    const docRef = ref(this._database, `${this._collection.key}/${key}`);
    try {
      //put key on data
      data['key'] = key;
      //save document
      await set(docRef, data);
      // or push push(child(ref(this._database), this._collection.key));
      //get firebase key
      return key;
    } catch (err) {
      this.handleFirebaseError('save', err);
    }
  }

  /**
   * Find a record by key
   */
  async findBy(key: number | string): Promise<any> {
    const childRef = child(this._collection, key.toString());
    try {
      const snapshot = await get(childRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (err) {
      this.handleFirebaseError('findBy', err);
    }
  }

  /**
   * Save or overwrite a record
   */
  async save(key: number | string, data: any): Promise<string> {
    try {
      //create doc ref
      const docRef = ref(this._database, `${this._collection.key}/${key}`);
      //save document
      await set(docRef, data);
      //firebase key
      return key.toString();
    } catch (err) {
      this.handleFirebaseError('save', err);
    }
  }

  /**
   * Find all records array format
   */
  async findAll(): Promise<any[]> {
    try {
      const snapshot = await get(this._collection);
      const list = [];
      if (snapshot.exists()) {
        const values = snapshot.val();
        const keys = Object.keys(values);
        for (const k of keys) {
          const value = values[k];
          //firebase send datan one data null
          if (value) {
            list.push(value);
          }
        }
      }
      return list;
    } catch (err) {
      this.handleFirebaseError('findAll', err);
    }
  }

  /**
   * Remove a record by key
   */
  async remove(key: number | string): Promise<boolean> {
    const docRef = ref(this._database, `${this._collection.key}/${key}`);
    const snapshot = await get(docRef);
    if (!snapshot.exists()) {
      return false;
    }
    return remove(docRef)
      .then(async function () {
        return true;
      })
      .catch(err => {
        throw this.handleFirebaseError('remove', err);
      });
  }

  /**
   * Throw firebase exception error
   */
  private handleFirebaseError(funcName: string, err: any) {
    this.logger.error(funcName, err);
    throw new FirebaseException(err);
  }
}
