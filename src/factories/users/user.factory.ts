import { Factory } from "../factory.abstract";
import { IUserFirestore } from "../../interfaces/users/user.firestore.interface";
import { IUserRTDB } from "../../interfaces/users/user.rtdb.interface";

export class UserRtdbToFirestoreFactory extends Factory<
  IUserRTDB,
  Partial<IUserFirestore>
> {
  static mapRTDBMetadata(
    type: "HELPER" | "DRIVER",
    params: any
  ): IUserFirestore["metadata"] {
    const metadata = {} as IUserFirestore["metadata"];

    if (type === "DRIVER") {
      metadata["group_name"] = params.groupName || "";
    }

    return metadata;
  }

  map(params: IUserRTDB): Partial<IUserFirestore> {
    const type =
      String(params.id).includes("_id") || Number(params.id) > 0
        ? "HELPER"
        : "DRIVER";

    return {
      id: String(params.id),
      type,
      metadata: UserRtdbToFirestoreFactory.mapRTDBMetadata(type, params),
    };
  }

  create(params: Partial<IUserFirestore>): IUserFirestore {
    return {
      id: params.id,
      name: params.name || "",
      photo: params.photo || "",
      type: params.type,
      metadata: params.metadata,
    };
  }
}
