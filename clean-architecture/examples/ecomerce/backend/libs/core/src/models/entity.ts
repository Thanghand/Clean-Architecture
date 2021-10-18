import { v4 as uuid } from 'uuid';

export abstract class Entity<Props = unknown> {

  protected readonly _id: string;
  public isDeleted: boolean;
  public createdAt: string;
  public updatedAt: string;

  protected constructor(public readonly props: Props, id?: string) {
    this._id = id ?? uuid();
    this.createdAt = Date.now().toString();
    this.updatedAt = this.createdAt;
  }
  get id() {
    return this._id;
  }

  public update() {
    this.updatedAt = Date.now().toString();
  }

  public equals(e?: Entity<Props>): boolean {
    if (e === null || e === undefined) {
      return false;
    }
    if (e._id.toString() === this._id.toString()) {
      return true;
    }
    return this === e;
  }
}