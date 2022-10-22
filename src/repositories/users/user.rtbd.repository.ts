import { Repository } from "../repository.abstract";
import { IUserRTDB } from "../../interfaces/users/user.rtdb.interface";
import { Database } from "firebase-admin/lib/database/database";

export class UserRTDBRepository extends Repository<Database, IUserRTDB> {
  private path = "/app/users";

  async findAll(): Promise<IUserRTDB[]> {
    const snapshot = await this.instance.ref(this.path).get();

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.values<IUserRTDB>(data).filter((item) => !!item.id);
  }

  insertMany(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
