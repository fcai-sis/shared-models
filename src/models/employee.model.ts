import mongoose, { InferSchemaType, Schema } from "mongoose";
import { userModelName } from "./user.model";

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

const EmployeeModel = mongoose.model<EmployeeType>(
  employeeModelName,
  employeeSchema
);

export { EmployeeModel, employeeModelName, EmployeeType };
