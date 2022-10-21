export type USER_TYPE = "DRIVER" | "HELPER";

type Secrets = {
  unload: string;
  lobby: string;
  cancel: string;
};

type SecretTypes = "supervisor" | keyof Secrets;

export type UserMetadata = {
  secrets: Secrets;
  group_name: string;
  user_id: string;
};

export interface IUserFirestore {
  id: string;
  name: string;
  photo: string;
  type: USER_TYPE;
  metadata: Partial<UserMetadata>;
}
