import { Schema, model } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from '../interfaces/IUser';
import { default as bcrypt } from 'bcryptjs';

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

UserSchema.pre<IUserDocument>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
}

const User = model<IUserDocument, IUserModel>("users", UserSchema);

export default User;