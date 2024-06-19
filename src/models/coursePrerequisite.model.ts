import mongoose from "mongoose";

import { courseModelName } from "./course.model";
import { foreignKey } from "../schema";

export const coursePrerequisiteModelName = "CoursePrerequisite";

export interface ICoursePrerequisite extends mongoose.Document {
  course: mongoose.Schema.Types.ObjectId;
  prerequisite: mongoose.Schema.Types.ObjectId;
}

export type CoursePrerequisiteType = Omit<
  ICoursePrerequisite,
  keyof mongoose.Document
>;

const coursePrerequisiteSchema = new mongoose.Schema<ICoursePrerequisite>({
  course: foreignKey(courseModelName),
  prerequisite: foreignKey(courseModelName),
});

export const CoursePrerequisiteModel =
  mongoose.models.CoursePrerequisite ||
  mongoose.model<ICoursePrerequisite>(
    coursePrerequisiteModelName,
    coursePrerequisiteSchema
  );
