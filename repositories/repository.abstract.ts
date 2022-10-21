export abstract class Repository<T = any> {
  abstract findAll(): Promise<T[]>;
}
