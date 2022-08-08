/**
 * Firebase exception
 */
export class FirebaseException extends Error {
  private _code: any;

  constructor(err: Error, code?: any) {
    super(err.message);
    this.stack = err?.stack;
    this._code = code;
  }

  get code() {
    return this._code;
  }
}
