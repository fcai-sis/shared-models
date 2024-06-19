import mongoose from "mongoose";

import { betweenValidator, integerValidator } from "../validators";

export const semesterModelName = "Semester";

export const SemesterSeasonEnum = [
  "FALL",
  "SPRING",
  "SUMMER",
  "WINTER",
] as const;
export type SemesterSeason = (typeof SemesterSeasonEnum)[number];

export interface ISemester extends mongoose.Document {
  year: number;
  month: number;
  season: SemesterSeason;
  createdAt: Date;
}

export type SemesterType = Omit<ISemester, keyof mongoose.Document>;

// A semester basically consists of a year and a semester type (e.g. "Fall", "Spring", "Summer").
// The semester also has an array of courses, which are the courses that are offered in that semester.
const semesterSchema = new mongoose.Schema<ISemester>({
  year: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        integerValidator("Year", v);
        betweenValidator("Year", v, 1900, 3000);
      },
    },
  },
  month: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        integerValidator("Month", v);
        betweenValidator("Month", v, 1, 12);
      },
    },
  },
  season: {
    type: String,
    enum: SemesterSeasonEnum,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SemesterModel =
  mongoose.models.Semester ||
  mongoose.model<ISemester>(semesterModelName, semesterSchema);
