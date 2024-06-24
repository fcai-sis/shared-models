import mongoose from "mongoose";
import { IStudent, studentSchema } from "./student.model";

export const graduatedStudentModelName = "GraduatedStudent";

export const GraduatedStudentModel =
  mongoose.models.Student ||
  mongoose.model<IStudent>(graduatedStudentModelName, studentSchema);
