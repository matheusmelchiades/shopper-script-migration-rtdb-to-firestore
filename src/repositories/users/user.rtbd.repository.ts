import { Repository } from "../repository.abstract";
import { IUserRTDB } from "../../interfaces/users/user.rtdb.interface";
import { Database } from "firebase-admin/lib/database/database";

import * as fs from "fs";

export class UserRTDBRepository extends Repository<Database, IUserRTDB> {
  private path = "/app/users";
  private cacheDir = __dirname + "/../../../tmp";
  private cachePath = this.cacheDir + "/users-rtdb.json";

  private hasLocalData(): boolean {
    return fs.existsSync(this.cachePath);
  }

  private async retrieveRemoteAllData(): Promise<IUserRTDB[]> {
    const snapshot = await this.instance.ref(this.path).get();

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.values<IUserRTDB>(data).filter((item) => !!item.id);
  }

  private async retrieveLocalAllData(): Promise<IUserRTDB[]> {
    try {
      const data = fs.readFileSync(this.cachePath, "utf8");

      return JSON.parse(data);
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  private saveLocalData(data: any): void {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir, { recursive: true });
      }

      fs.writeFileSync(this.cachePath, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<IUserRTDB[]> {
    if (this.hasLocalData()) return this.retrieveLocalAllData();

    const data = await this.retrieveRemoteAllData();

    await this.saveLocalData(data);

    return data;
  }

  insertMany(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
