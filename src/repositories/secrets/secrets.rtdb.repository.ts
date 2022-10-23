import * as fs from "fs";

import { Repository } from "../repository.abstract";
import { Database } from "firebase-admin/lib/database/database";

import { Cache } from "src/services/cache/cache.abstract";
import { ISecretsRTDB } from "src/interfaces/secrets/secrets.rtdb";

export class SecretsRTDBRepository extends Repository<
  ISecretsRTDB,
  Database,
  Cache
> {
  private path = "/app/keys";

  findAll(): Promise<ISecretsRTDB[]> {
    throw new Error("Method not implemented.");
  }

  insertMany(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOne(reference: string): Promise<ISecretsRTDB | null> {
    const snapshot = await this.instance.ref(`${this.path}/${reference}`).get();

    if (!snapshot.exists()) return null;

    return snapshot.val();
  }
}
