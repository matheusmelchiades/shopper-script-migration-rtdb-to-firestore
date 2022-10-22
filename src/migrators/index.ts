import { getRepository } from "fireorm";

import { UserMigrator } from "./user";

import { UserRTDBRepository } from "../repositories/users/user.rtbd.repository";
import { UserFirestoreRepository } from "../repositories/users/user.firestore.repository";
import { UserRtdbToFirestoreFactory } from "../factories/users/user.factory";
import { UserFirestoreEntity } from "../entities/user.firestore.entity";

import { database } from "../services/firebase";
import { CacheFileSystem } from "../services/cache/file-system.cache";

export default {
  user: new UserMigrator(
    new UserRTDBRepository(database, new CacheFileSystem("users-rtdb")),
    new UserFirestoreRepository(getRepository(UserFirestoreEntity)),
    new UserRtdbToFirestoreFactory()
  ),
};
