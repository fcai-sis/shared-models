import mongoose, { InferSchemaType, Schema } from "mongoose";
import { userModelName } from "./user.model";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";

const employeeSchema = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelName,
    required: true,
  },
});

type EmployeeType = InferSchemaType<typeof employeeSchema>;

const employeeModelName = "Employee";

// Pre-save hook to ensure referential integrity
employeeSchema.pre("save", async function (next) {
  try {
    const user = await mongoose.model(userModelName).findById(this.userId);
    if (!user) {
      throw new ForeignKeyNotFound("User not found");
    }
  } catch (error: any) {
    return next(error);
  }
});
const EmployeeModel = mongoose.model<EmployeeType>(
  employeeModelName,
  employeeSchema
);

export { EmployeeModel, employeeModelName, EmployeeType };
