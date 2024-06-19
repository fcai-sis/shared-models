import mongoose from "mongoose";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";
import { foreignKey } from "../schema";

export interface ICourseWork extends mongoose.Document {
  description: {
    ar: string;
    en: string;
  };
  course: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
  deadline: Date;
  grade: number;
}

export type CourseWorkType = Omit<ICourseWork, keyof mongoose.Document>;

export const courseWorkModelName = "CourseWork";

const courseWorkSchema = new mongoose.Schema<ICourseWork>({
  description: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
  deadline: {
    type: Date,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

export const CourseWorkModel =
  mongoose.models.CourseWork ||
  mongoose.model<ICourseWork>(courseWorkModelName, courseWorkSchema);
