import { Migrator } from "./migrator.abstract";

import { IUserFirestore } from "../interfaces/users/user.firestore.interface";
import { SecretsRTDBRepository } from "src/repositories/secrets/secrets.rtdb.repository";
import { UserRTDBRepository } from "src/repositories/users/user.rtbd.repository";
import { UserFirestoreRepository } from "src/repositories/users/user.firestore.repository";
import { UserRtdbToFirestoreFactory } from "src/factories/users/user.factory";
import { UserProviderRepository } from "src/repositories/users/user.provider.repository";
import { PhotosRTDBRepository } from "src/repositories/photos/photos.repository";

export class UserMigrator extends Migrator<
  UserRTDBRepository,
  UserFirestoreRepository,
  UserRtdbToFirestoreFactory,
  {
    secrets: SecretsRTDBRepository;
    provider: UserProviderRepository;
    photos: PhotosRTDBRepository;
  }
> {
  private filterAlreadyExists(prev, target, property = "id") {
    return prev.filter(
      (item) => !target.find((t) => t[property] === item[property])
    );
  }

  private async applyDependencies(
    data: IUserFirestore
  ): Promise<IUserFirestore> {
    try {
      const userProvider = await this.repositories.provider.findOne(data.id);

      let photo = userProvider?.photoURL || "";
      const name = data.name || userProvider?.displayName || "";
      const metadata = { ...data.metadata } as any;

      if (data.type === "DRIVER") {
        const photoDB = await this.repositories.photos.findOne(data.id);
        const secrets = await this.repositories.secrets.findOne(data.id);

        metadata.secrets = secrets;
        photo = photoDB?.foto_motorista ?? photo;
      }

      return this.factory.create({
        id: data.id,
        name: name,
        photo: photo,
        type: data.type,
        metadata,
      });
    } catch (err) {
      console.log(err, data);
    }
  }

  private async handleDependencies(
    data: IUserFirestore[]
  ): Promise<IUserFirestore[]> {
    return Promise.all(data.map((item) => this.applyDependencies(item)));
  }

  async run(): Promise<void> {
    const rtdbData = await this.repoFrom.findAll();
    const firestoreData = await this.repoTo.findAll();

    const firestoreMapped = rtdbData.map(this.factory.map);
    const filtereds = this.filterAlreadyExists(firestoreMapped, firestoreData);

    const updates = await this.handleDependencies(filtereds);

    await this.repoTo.insertMany(updates);
  }
}
