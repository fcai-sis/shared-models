import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { arabicValidator, emailValidator } from "../validators";
import { foreignKey, LocalizedFields } from "../schema";

export const teachingAssistantModelName = "TeachingAssistant";

export interface ITeachingAssistant extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  officeHours?: string;
  office?: string;
}

export type TeachingAssistantType = Omit<
  ITeachingAssistant,
  keyof mongoose.Document
>;

const teachingAssistantSchema = new mongoose.Schema<ITeachingAssistant>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => emailValidator("TA Email", v),
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
});

export const TeachingAssistantModel =
  mongoose.models.TeachingAssistant ||
  mongoose.model<ITeachingAssistant>(
    teachingAssistantModelName,
    teachingAssistantSchema
  );

export const teachingAssistantLocalizedFields: LocalizedFields<
  Omit<TeachingAssistantType, "user">
> = {
  fullName: { ar: "الاسم الكامل", en: "Full Name" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  department: { ar: "القسم", en: "Department" },
  officeHours: { ar: "ساعات الدوام", en: "Office Hours" },
};
