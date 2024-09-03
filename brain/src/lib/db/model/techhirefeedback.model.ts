import mongoose ,{Schema,Document} from "mongoose";

export interface Feedback extends Document {
    roleid: string;
    review:number
  }

const RoleFeedSchema: Schema<Feedback>=new Schema({
    roleid: { type: String, required: true },
    review: { type: Number, required: true },
  },{timestamps:true})


const FeedbackModel =
  (mongoose.models.Feedback as mongoose.Model<Feedback>) ||
  mongoose.model<Feedback>('Feedback', RoleFeedSchema);

export default FeedbackModel;