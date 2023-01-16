
import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  mongoose,
  pre,
  prop,
  Severity
} from '@typegoose/typegoose';

export class Item {
  @prop({type: mongoose.Schema.Types.Mixed})
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
const itemModel = getModelForClass(Item);
export default itemModel;