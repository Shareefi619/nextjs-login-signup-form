import { Schema, model, Document, Model, models, ObjectId } from "mongoose";

export interface UserDocument extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  contactNumber: number;
  address: string;
  email: string;
  password: string;
  // isActive: boolean;
}

const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
    // isActive: {
    //   type: Boolean,
    //   required: true,
    // },
});

const User: Model<UserDocument> =
  models.User || model<UserDocument>("User", userSchema);

export default User;
