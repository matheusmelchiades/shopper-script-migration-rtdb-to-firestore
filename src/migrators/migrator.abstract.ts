import { Factory } from "../factories/factory.abstract";
import { IUserFirestore } from "../interfaces/users/user.firestore.interface";
import { IUserRTDB } from "../interfaces/users/user.rtdb.interface";
import { Repository } from "../repositories/repository.abstract";

export abstract class Migrator<K = any, T = any> {
  constructor(
    protected repoFrom: Repository<any, K>,
    protected repoTo: Repository<any, T>,
    protected factory: Factory<IUserRTDB, IUserFirestore>
  ) {}

  abstract run(): Promise<void>;
}
