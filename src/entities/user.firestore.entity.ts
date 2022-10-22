import { Collection, IEntity } from "fireorm";
import {
  IUserFirestore,
  USER_TYPE,
  UserMetadata,
} from "../interfaces/users/user.firestore.interface";

@Collection("users")
export class UserFirestoreEntity implements IUserFirestore, IEntity {
  id: string;
  name: string;
  photo: string;
  type: USER_TYPE;
  metadata: UserMetadata;
}
