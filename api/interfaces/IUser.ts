import { Document, Model } from 'mongoose';

export interface IUser {
    email: string;
    username: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
    buildUser(args: IUser): IUserDocument;
}