export abstract class Cache<T = any> {
  protected dir = __dirname + "/../../../tmp";
  protected path: string;

  constructor(protected name: string) {
    if (!name) throw new Error("Cache name is required");

    this.path = `${this.dir}/${name}.json`;
  }

  abstract save(data: T): void;
  abstract has(): boolean;
  abstract load(): T;
  abstract update(data: T): void;
}
