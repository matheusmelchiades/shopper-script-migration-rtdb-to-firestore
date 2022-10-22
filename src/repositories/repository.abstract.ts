export abstract class Repository<K = any, T = any> {
  constructor(protected instance: K) {
    this.instance = this.instance;
  }

  abstract findAll(): Promise<T[]>;
  abstract insertMany(data: T[]): Promise<void>;
}
