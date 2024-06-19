import mongoose from "mongoose";

import { courseModelName } from "./course.model";
import { departmentModelName } from "./department.model";
import { foreignKey } from "../schema";

export interface ICourseDepartment extends mongoose.Document {
  course: mongoose.Schema.Types.ObjectId;
  department: mongoose.Schema.Types.ObjectId;
}

export type CourseDepartmentType = Omit<
  ICourseDepartment,
  keyof mongoose.Document
>;

export const courseDepartmentModelName = "CourseDepartment";

const courseDepartmentSchema = new mongoose.Schema<ICourseDepartment>({
  course: foreignKey(courseModelName),
  department: foreignKey(departmentModelName),
});

export const CourseDepartmentModel =
  mongoose.models.CourseDepartment ||
  mongoose.model<ICourseDepartment>(
    courseDepartmentModelName,
    courseDepartmentSchema
  );
