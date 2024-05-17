import mongoose from "mongoose";
import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";

export interface ITeachingAssistant extends mongoose.Document {
  fullName: string;
  email: string;
  department: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const teachingAssistantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelName,
    required: true,
  },
});

export const teachingAssistantName = "TeachingAssistant";

export const TeacherAssistantModel = mongoose.models.TeachingAssistant || mongoose.model<ITeachingAssistant>(teachingAssistantName, teachingAssistantSchema);
