import mongoose from "mongoose";

import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { arabicValidator, emailValidtor } from "../validators";
import { foreignKey } from "../schema";

export const teachingAssistantModelName = "TeachingAssistant";

export interface ITeachingAssistant extends mongoose.Document {
  fullName: string;
  email: string;
  department: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

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
      validator: (v: string) => emailValidtor("TA Email", v),
    },
  },
  department: foreignKey(departmentModelName),
  user: foreignKey(userModelName),
});

export const TeachingAssistantModel =
  mongoose.models.TeachingAssistant ||
  mongoose.model<ITeachingAssistant>(
    teachingAssistantModelName,
    teachingAssistantSchema
  );
