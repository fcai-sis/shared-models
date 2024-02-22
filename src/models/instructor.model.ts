import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
import { departmentModelName } from "./department.model";

const instructorSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  department: {
    type: Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
});

export type InstructorType = InferSchemaType<typeof instructorSchema>;

export const instructorModelName = "Instructor";

const InstructorModel = mongoose.model<InstructorType>(
  instructorModelName,
  instructorSchema
);

export default InstructorModel;
