import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { emailValidator } from "../validators";
import { LocalizedFields, foreignKey } from "../schema";

export const instructorModelName = "Instructor";

export const TitleEnum = [
  "ASSISTANT",
  "ASSISTANT_INSTRUCTOR",
  "INSTRUCTOR",
  "ASSISTANT_PROFESSOR",
  "PROFESSOR",
] as const;

export type TitleEnumType = (typeof TitleEnum)[number];

export interface IInstructor extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  officeHours?: string;
  office?: string;

  // Updated by Admin or Instructor
  title: TitleEnumType;
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
  office: {
    type: String,
    default: null,
  },
  officeHours: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    enum: TitleEnum,
    required: true,
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
  title: { ar: "اللقب", en: "Title" },
};
