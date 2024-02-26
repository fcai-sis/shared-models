import mongoose, { InferSchemaType, Schema } from "mongoose";
import { departmentModelName } from "../department.model";

const instructorSchema: Schema = new Schema({
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
});

type InstructorType = InferSchemaType<typeof instructorSchema>;

const instructorModelName = "Instructor";

const InstructorModel = mongoose.model<InstructorType>(
  instructorModelName,
  instructorSchema
);

export { InstructorModel, InstructorType, instructorModelName };
