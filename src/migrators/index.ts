import { getRepository } from "fireorm";

import { UserMigrator } from "./user";

import { UserRTDBRepository } from "../repositories/users/user.rtbd.repository";
import { UserFirestoreRepository } from "../repositories/users/user.firestore.repository";
import { UserRtdbToFirestoreFactory } from "../factories/users/user.factory";
import { UserFirestoreEntity } from "../entities/user.firestore.entity";
import { SecretsRTDBRepository } from "../repositories/secrets/secrets.rtdb.repository";
import { UserProviderRepository } from "../repositories/users/user.provider.repository";

import { database, auth } from "../services/firebase";
import { CacheFileSystem } from "../services/cache/file-system.cache";
import { PhotosRTDBRepository } from "../repositories/photos/photos.repository";

export default {
  user: new UserMigrator(
    new UserRTDBRepository(database, new CacheFileSystem("users-rtdb")),
    new UserFirestoreRepository(getRepository(UserFirestoreEntity)),
    new UserRtdbToFirestoreFactory(),
    {
      secrets: new SecretsRTDBRepository(
        database,
        new CacheFileSystem("secrets-rtdb")
      ),
      provider: new UserProviderRepository(auth),
      photos: new PhotosRTDBRepository(database),
    },
    {
      cache: new CacheFileSystem("users-migrator"),
      errors: new CacheFileSystem("users-migrator-errors"),
    }
  ),
};
