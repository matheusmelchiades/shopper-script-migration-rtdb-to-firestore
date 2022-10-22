export abstract class Factory<K = any, T = any> {
  abstract map(params: K): Partial<T>;
  abstract create(params: Partial<T>): T;
}
