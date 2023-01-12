import { prop } from "@typegoose/typegoose";

export class Item {
  @prop()
  id: string;
  @prop()
  title: string;
  @prop()
  price: {
    value: number;
    currency: string;
  };
  @prop()
  image: {
    uri: string | undefined;
  };
  @prop()
  itemRef: string;
}
