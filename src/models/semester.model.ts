import mongoose from "mongoose";

export const semesterModelName = "Semester";

export const SemesterSeasonEnum = [
  "FALL",
  "SPRING",
  "SUMMER",
  "WINTER",
] as const;
export type SemesterSeason = (typeof SemesterSeasonEnum)[number];

export interface ISemester extends mongoose.Document {
  season: SemesterSeason;
  createdAt: Date;
  endedAt?: Date;
}

export type SemesterType = Omit<ISemester, keyof mongoose.Document>;

// A semester basically consists of a year and a semester type (e.g. "Fall", "Spring", "Summer").
// The semester also has an array of courses, which are the courses that are offered in that semester.
const semesterSchema = new mongoose.Schema<ISemester>({
  season: {
    type: String,
    enum: SemesterSeasonEnum,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
    default: null,
  },
});

export const SemesterModel =
  mongoose.models.Semester ||
  mongoose.model<ISemester>(semesterModelName, semesterSchema);
