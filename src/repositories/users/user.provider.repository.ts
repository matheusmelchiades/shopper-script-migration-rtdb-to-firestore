import { BaseAuth } from "firebase-admin/lib/auth/base-auth";
import { IUserProvider } from "src/interfaces/users/user.provider.interface";
import { Repository } from "../repository.abstract";

export class UserProviderRepository extends Repository<
  IUserProvider,
  BaseAuth
> {
  findAll(): Promise<IUserProvider[]> {
    throw new Error("Method not implemented.");
  }
  insertMany(data: IUserProvider[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOne(reference: string): Promise<IUserProvider> {
    try {
      const user = await this.instance.getUser(reference);

      return user;
    } catch (err) {
      return null;
    }
  }
}
