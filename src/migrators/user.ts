import { Migrator } from "./migrator.abstract";

import { IUserFirestore } from "../interfaces/users/user.firestore.interface";
import { IUserRTDB } from "../interfaces/users/user.rtdb.interface";

export class UserMigrator extends Migrator<IUserRTDB, IUserFirestore> {
  private filterAlreadyExists(prev, target, property = "id") {
    return prev.filter(
      (item) => !target.find((t) => t[property] === item[property])
    );
  }

  async run(): Promise<void> {
    const rtdbData = await this.repoFrom.findAll();
    const firestoreData = await this.repoTo.findAll();

    const firestoreMapped = rtdbData.map(this.factory.map);
    const firestoreInserts = firestoreMapped.map(this.factory.create);

    const updates = this.filterAlreadyExists(firestoreInserts, firestoreData);

    await this.repoTo.insertMany(updates);
  }
}
