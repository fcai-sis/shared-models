import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { emailValidator } from "../validators";
import { LocalizedFields, foreignKey } from "../schema";

export const instructorModelName = "Instructor";

export interface IInstructor extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  officeHours?: string;
}

export type InstructorType = Omit<IInstructor, keyof mongoose.Document>;

const instructorSchema = new mongoose.Schema<IInstructor>({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidator("Instructor Email", v),
    },
  },
  department: foreignKey(departmentModelName),
  user: foreignKey(userModelName),
  officeHours: {
    type: String,
    default: null,
  },
});

export const InstructorModel =
  mongoose.models.Instructor ||
  mongoose.model<IInstructor>(instructorModelName, instructorSchema);

export const instructorLocalizedFields: LocalizedFields<
  Omit<InstructorType, "user">
> = {
  fullName: { ar: "الاسم الكامل", en: "Full Name" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  department: { ar: "القسم", en: "Department" },
  officeHours: { ar: "ساعات الدوام", en: "Office Hours" },
};
