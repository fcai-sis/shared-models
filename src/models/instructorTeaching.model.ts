import mongoose from "mongoose";

import { instructorModelName } from "./instructor.model";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";
import { foreignKey } from "../schema";

export const instructorTeachingModelName = "InstructorTeaching";

export interface IInstructorTeaching extends mongoose.Document {
  instructor: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
}

const instructorTeachingSchema = new mongoose.Schema<IInstructorTeaching>({
  instructor: foreignKey(instructorModelName),
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
});

export const InstructorTeachingModel =
  mongoose.models.InstructorTeaching ||
  mongoose.model<IInstructorTeaching>(
    instructorTeachingModelName,
    instructorTeachingSchema
  );
