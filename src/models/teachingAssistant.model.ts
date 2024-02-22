import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
import { departmentModelName } from "./department.model";

const teacherAssistantSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  department: {
    //TODO: Change the type to be a reference to the Department model
    type: Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
});

export type TeacherAssistantType = InferSchemaType<typeof teacherAssistantSchema>;

export const teacherAssistantModelName = "TeacherAssistant";

const TeacherAssistantModel = mongoose.model<TeacherAssistantType>(
  teacherAssistantModelName,
  teacherAssistantSchema
);

export default TeacherAssistantModel;
