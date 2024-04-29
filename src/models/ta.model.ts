import mongoose, { InferSchemaType, Schema } from "mongoose";
import { departmentModelName } from "./department.model";
import { userModelName } from "./user.model";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";

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

// Pre-save hook to ensure referential integrity
teacherAssistantSchema.pre("save", async function (next) {
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

const TeacherAssistantModel = mongoose.model<TeacherAssistantType>(
  teacherAssistantModelName,
  teacherAssistantSchema
);

export {
  TeacherAssistantModel,
  teacherAssistantModelName,
  TeacherAssistantType,
};
