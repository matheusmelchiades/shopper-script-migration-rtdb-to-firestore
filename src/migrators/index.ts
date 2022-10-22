import { getRepository } from "fireorm";

import { database, firestore } from "../setup/firebase";

import { UserMigrator } from "./user";

import { UserRTDBRepository } from "../repositories/users/user.rtbd.repository";
import { UserFirestoreRepository } from "../repositories/users/user.firestore.repository";
import { UserRtdbToFirestoreFactory } from "../factories/users/user.factory";
import { UserFirestoreEntity } from "../entities/user.firestore.entity";

export default {
  user: new UserMigrator(
    new UserRTDBRepository(database),
    new UserFirestoreRepository(getRepository(UserFirestoreEntity)),
    new UserRtdbToFirestoreFactory()
  ),
};
