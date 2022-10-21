export abstract class Factory<K, T> {
  abstract mapFrom(params: K): T;
  abstract mapTo<Z>(params: T): K | Z;
}
