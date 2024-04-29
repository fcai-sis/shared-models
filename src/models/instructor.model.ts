import mongoose, { InferSchemaType, Schema } from "mongoose";
import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";

const instructorSchema = new Schema({
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

type InstructorType = InferSchemaType<typeof instructorSchema>;

const instructorModelName = "Instructor";

// Pre-save hook to ensure referential integrity
instructorSchema.pre("save", async function (next) {
  try {
    const user = await mongoose.model(userModelName).findById(this.userId);
    if (!user) {
      throw new ForeignKeyNotFound("User not found");
    }

    const department = await mongoose
      .model(departmentModelName)
      .findById(this.department);
    if (!department) {
      throw new ForeignKeyNotFound("Department not found");
    }
  } catch (error: any) {
    return next(error);
  }
});

const InstructorModel = mongoose.model<InstructorType>(
  instructorModelName,
  instructorSchema
);

export { InstructorModel, InstructorType, instructorModelName };
