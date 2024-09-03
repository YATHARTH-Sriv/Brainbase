import mongoose ,{Schema,Document} from "mongoose";

export interface Recruit extends Document {
    role: string;
    skill: Array<string>;
    desc: string;
    email: Array<string>;
  }

const RoleSchema: Schema<Recruit>=new Schema({
    role: { type: String, required: true },
    skill: { type: [String], required: true },
    desc: { type: String, required: true },
    email:{type:[String]}
  },{timestamps:true})


const RecruitModel =
  (mongoose.models.Recruit as mongoose.Model<Recruit>) ||
  mongoose.model<Recruit>('Recruit', RoleSchema);

export default RecruitModel;