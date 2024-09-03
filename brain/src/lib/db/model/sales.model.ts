import mongoose ,{Schema,Document} from "mongoose";

export interface Sale extends Document {
    yoe: string;
    desc: string;
  }

const SaleSchema: Schema<Sale>=new Schema({
    yoe: { type: String, required: true },
    desc: { type: String, required: true },
  },{timestamps:true})


const SalesModel =
  (mongoose.models.Sale as mongoose.Model<Sale>) ||
  mongoose.model<Sale>('Sale', SaleSchema);

export default SalesModel;