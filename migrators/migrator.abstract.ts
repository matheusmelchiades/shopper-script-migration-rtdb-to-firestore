import { Repository } from "../repositories/repository.abstract";

export abstract class Migrator {
  constructor(protected repoFrom: Repository, protected repoTo: Repository) {}

  abstract run(): Promise<void>;
}
