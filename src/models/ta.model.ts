import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { arabicValidator, emailValidator } from "../validators";
import { foreignKey } from "../schema";

export const teachingAssistantModelName = "TeachingAssistant";

export interface ITeachingAssistant extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  // office hours field text field nullable
  officeHours?: string;
}

export type TeachingAssistantType = Omit<
  ITeachingAssistant,
  keyof mongoose.Document
>;

const teachingAssistantSchema = new mongoose.Schema<ITeachingAssistant>({
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => arabicValidator("Full Name", v),
    },
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
