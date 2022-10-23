import { Factory } from "src/factories/factory.abstract";
import { Repository } from "../repositories/repository.abstract";

export abstract class Migrator<
  K extends Repository = any,
  T extends Repository = any,
  W extends Factory = any,
  Z extends Record<string, Repository> = {},
  Y extends Record<string, Cache> = {}
> {
  constructor(
    protected repoFrom: K,
    protected repoTo: T,
    protected factory: W,
    protected repositories: Z = {} as Z,
    protected caches: Y = {} as Y
  ) {}

  abstract run(): Promise<void>;
}
