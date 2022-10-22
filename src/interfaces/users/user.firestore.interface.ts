export type USER_TYPE = "DRIVER" | "HELPER";

type Secrets = {
  unload: string;
  lobby: string;
  cancel: string;
};

type MetadataDriver = {
  secrets: Secrets;
  group_name: string;
};

type MetadataHelper = {
  user_id: string;
};

export type UserMetadata = MetadataDriver | MetadataHelper;

export interface IUserFirestore {
  id: string;
  name: string;
  photo: string;
  type: USER_TYPE;
  metadata: UserMetadata;
}
