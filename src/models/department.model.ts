import mongoose, { InferSchemaType } from "mongoose";

const departmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
});

const departmentModelName = "Department";

type DepartmentType = InferSchemaType<typeof departmentSchema>;

const DepartmentModel = mongoose.model<DepartmentType>(
  departmentModelName,
  departmentSchema
);

export { DepartmentModel, DepartmentType, departmentModelName };
