import { Collection } from "fireorm";
import {
  IUserFirestore,
  USER_TYPE,
  UserMetadata,
} from "../interfaces/users/user.firestore.interface";

@Collection("users")
export class UserFirestoreEntity implements IUserFirestore {
  id: string;
  name: string;
  photo: string;
  type: USER_TYPE;
  metadata: Partial<UserMetadata>;
}
