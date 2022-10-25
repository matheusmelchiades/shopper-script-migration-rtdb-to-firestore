import * as fs from "fs";

import { Repository } from "../repository.abstract";
import { Database } from "firebase-admin/lib/database/database";

import { Cache } from "src/services/cache/cache.abstract";
import { IPhotosRTDB } from "src/interfaces/photos/photos.rtdb";

export class PhotosRTDBRepository extends Repository<
  IPhotosRTDB,
  Database,
  Cache
> {
  private path = "/app/photos";

  findAll(): Promise<IPhotosRTDB[]> {
    throw new Error("Method not implemented.");
  }
  insertMany(data: IPhotosRTDB[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOne(reference: string): Promise<IPhotosRTDB | null> {
    const snapshot = await this.instance.ref(`${this.path}/${reference}`).get();

    if (!snapshot.exists()) return null;

    return snapshot.val();
  }
}
