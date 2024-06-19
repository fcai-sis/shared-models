import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { emailValidtor } from "../validators";
import { foreignKey } from "../schema";

export const instructorModelName = "Instructor";

export interface IInstructor extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

const instructorSchema = new mongoose.Schema<IInstructor>({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidtor("Instructor Email", v),
    },
  },
  department: foreignKey(departmentModelName),
  user: foreignKey(userModelName),
});

export const InstructorModel =
  mongoose.models.Instructor ||
  mongoose.model<IInstructor>(instructorModelName, instructorSchema);
