import { Document, Model } from 'mongoose';

export interface IItem {
    name: string;
    createdAt: Date;
}

export interface IItemDocument extends IItem, Document { }

export interface IItemModel extends Model<IItemDocument> {
    buildItem(args: IItem): IItemDocument;
}