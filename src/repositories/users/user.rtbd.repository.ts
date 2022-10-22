import * as fs from "fs";

import { Repository } from "../repository.abstract";
import { IUserRTDB } from "../../interfaces/users/user.rtdb.interface";
import { Database } from "firebase-admin/lib/database/database";

import { Cache } from "src/services/cache/cache.abstract";

export class UserRTDBRepository extends Repository<Database, IUserRTDB, Cache> {
  private path = "/app/users";

  private async retrieveRemoteAllData(): Promise<IUserRTDB[]> {
    const snapshot = await this.instance.ref(this.path).get();

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.values<IUserRTDB>(data).filter((item) => !!item.id);
  }

  async findAll(): Promise<IUserRTDB[]> {
    if (this.cache.has()) return this.cache.load();

    const data = await this.retrieveRemoteAllData();

    await this.cache.save(data);

    return data;
  }

  insertMany(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
