import mongoose from "mongoose";
import { IStudent, studentSchema } from "./student.model";

export const graduatedStudentModelName = "GraduatedStudent";

export const GraduatedStudentModel =
  mongoose.models[graduatedStudentModelName] ||
  mongoose.model<IStudent>(graduatedStudentModelName, studentSchema);
