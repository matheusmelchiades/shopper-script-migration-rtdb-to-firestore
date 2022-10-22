import { BaseFirestoreRepository, getRepository } from "fireorm";

import { Repository } from "../repository.abstract";

import { IUserFirestore } from "../../interfaces/users/user.firestore.interface";

export class UserFirestoreRepository extends Repository<
  BaseFirestoreRepository<IUserFirestore>,
  IUserFirestore
> {
  async findAll(): Promise<IUserFirestore[]> {
    return this.instance.find();
  }

  async insertMany(data: IUserFirestore[]): Promise<void> {
    if (!data.length) return;

    const batch = this.instance.createBatch();
    try {
      data.forEach((item) => {
        batch.create(item);
      });

      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  }
}
