import mongoose, { InferSchemaType, Schema } from "mongoose";

const employeeSchema: Schema = new Schema({
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
});

type EmployeeType = InferSchemaType<typeof employeeSchema>;

const employeeModelName = "Employee";

const EmployeeModel = mongoose.model<EmployeeType>(
  employeeModelName,
  employeeSchema
);

export { EmployeeModel, employeeModelName, EmployeeType };


