import { Schema, model } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from '../interfaces/IUser';

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }
);

UserSchema.statics.buildUser = (args: IUser) => {
  return new User(args);
}

const User = model<IUserDocument, IUserModel>("users", UserSchema);

export default User;