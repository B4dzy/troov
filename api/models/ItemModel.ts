import { Schema, model } from 'mongoose';
import { IItem, IItemDocument, IItemModel } from '../interfaces/IItem';

const ItemSchema: Schema<IItemDocument> = new Schema(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }
);

ItemSchema.statics.buildItem = (args: IItem) => {
  return new Item(args);
}

const Item = model<IItemDocument, IItemModel>("items", ItemSchema);

export default Item;