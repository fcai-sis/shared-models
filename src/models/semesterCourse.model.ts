import mongoose from "mongoose";

import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";
import { foreignKey } from "../schema";

export const semesterCourseModelName = "SemesterCourse";

export interface ISemesterCourse extends mongoose.Document {
  course: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
}

const semesterCourseSchema = new mongoose.Schema<ISemesterCourse>({
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
});

export const SemesterCourseModel =
  mongoose.models.SemesterCourse ||
  mongoose.model<ISemesterCourse>(
    semesterCourseModelName,
    semesterCourseSchema
  );
