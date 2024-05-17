import { courseModelName } from "../models/course.model";
import { ForeignKeyNotFound } from "@fcai-sis/shared-utilities";
import mongoose from "mongoose";

export interface ISemester extends mongoose.Document {
  year: number;
  semesterType: string;
  courseIds: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

// A semester basically consists of a year and a semester type (e.g. "Fall", "Spring", "Summer").
// The semester also has an array of courses, which are the courses that are offered in that semester.
const semesterSchema = new mongoose.Schema<ISemester>({
  year: {
    type: Number,
    required: true,
  },
  semesterType: {
    type: String,
    enum: ["Fall", "Spring", "Summer", "Winter"],
    required: true,
  },
  courseIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: courseModelName,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to ensure referential integrity
semesterSchema.pre("save", async function(next) {
  try {
    const courses = await mongoose
      .model(courseModelName)
      .find({ _id: { $in: this.courseIds } });
    if (courses.length !== this.courseIds.length) {
      throw new ForeignKeyNotFound("Some courses not found");
    }

    next();
  } catch (error: any) {
    return next(error);
  }
});

export const semesterModelName = "Semester";

export const SemesterModel = mongoose.models.Semester || mongoose.model<ISemester>(semesterModelName, semesterSchema);
