import * as fs from "fs";
import { Cache } from "./cache.abstract";

export class CacheFileSystem<T = any> extends Cache<T> {
  save(data: any): void {
    try {
      if (!fs.existsSync(this.dir)) {
        fs.mkdirSync(this.dir, { recursive: true });
      }

      fs.writeFileSync(this.path, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  has(): boolean {
    return fs.existsSync(this.path);
  }

  load(): T {
    if (!this.has()) return [] as T;

    try {
      const data = fs.readFileSync(this.path, "utf8");

      return JSON.parse(data || "[]");
    } catch (err) {
      console.log(err);
      return [] as T;
    }
  }

  update(data: T): void {
    const localData = this.load() as T[];

    const update = [...localData, data];

    this.save(update);
  }
}
