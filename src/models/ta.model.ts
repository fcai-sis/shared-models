import mongoose, { InferSchemaType, Schema } from "mongoose";
import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";

const teacherAssistantSchema = new Schema({
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

type TeacherAssistantType = InferSchemaType<typeof teacherAssistantSchema>;

const teacherAssistantModelName = "TeacherAssistant";

const TeacherAssistantModel = mongoose.model<TeacherAssistantType>(
  teacherAssistantModelName,
  teacherAssistantSchema
);

export {
  TeacherAssistantModel,
  teacherAssistantModelName,
  TeacherAssistantType,
};
