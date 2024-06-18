import mongoose from "mongoose";
import { courseModelName } from "./course.model";

export interface ICourseWork extends mongoose.Document {
  description: {
    ar: string;
    en: string;
  };
  course: mongoose.Schema.Types.ObjectId;
  deadline: Date;
  grade: number;
}

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
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModelName,
    required: true,
  },
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
