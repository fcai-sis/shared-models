import mongoose from "mongoose";

import { userModelName } from "./user.model";
import { emailValidator } from "../validators";
import { foreignKey } from "schema";

export const adminModelName = "Admin";

export interface IAdmin extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  user: mongoose.Schema.Types.ObjectId;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidator("Admin Email", v),
    },
  },
  user: foreignKey(userModelName),
});

export const AdminModel =
  mongoose.models.Admin || mongoose.model<IAdmin>(adminModelName, adminSchema);
