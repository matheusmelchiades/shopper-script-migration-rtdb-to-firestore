export abstract class Repository<T = any, K = any, Z = {}> {
  constructor(protected instance: K, protected cache?: Z) {
    this.instance = this.instance;
    this.cache = this.cache;
  }

  abstract findAll(): Promise<T[]>;
  abstract insertMany(data: T[]): Promise<void>;
  abstract findOne(reference: string): Promise<T | null>;
}
