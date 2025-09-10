import { UserModel } from '../db/models/UserModel.js';
import { UserEntity, UserProps } from '../../domain/entities/User.js';

export class UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await UserModel.findOne({ email }).lean();
    return doc ? new UserEntity({ email: doc.email, name: doc.name, passwordHash: doc.passwordHash }, doc._id.toString()) : null;
  }

  async create(data: UserProps): Promise<UserEntity> {
    const doc = await UserModel.create(data);
    return new UserEntity({ email: doc.email, name: doc.name, passwordHash: doc.passwordHash }, doc._id.toString());
  }
}
