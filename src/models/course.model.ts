import mongoose from "mongoose";

import { departmentModelName } from "./department.model";

export interface ICourse extends mongoose.Document {
  code: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  prerequisites: mongoose.Schema.Types.ObjectId[];
  departments: mongoose.Schema.Types.ObjectId[];
  creditHours: number;
  courseType: CourseTypeEnumType;
}

export const courseModelName = "Course";

export const CourseTypeEnum = ["mandatory", "elective", "graduation"];
export type CourseTypeEnumType = typeof CourseTypeEnum[number];

const courseSchema = new mongoose.Schema<ICourse>({
  code: {
    type: String,
    required: true,
    unique: true,
    match: [
      // Course code must follow this pattern: 2-4 uppercase letters followed by 3 digits
      /^[A-Z]{2,4}\d{3}$/,
      "Invalid course code",
    ],
  },
  name: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
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
  prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courseModelName,
    },
  ],
  departments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: departmentModelName,
    required: true,
  },
  creditHours: {
    type: Number,
    required: true,
  },
  courseType: {
    type: String,
    enum: CourseTypeEnum,
    required: true,
  },
});

export const CourseModel = mongoose.models.Course || mongoose.model<ICourse>(courseModelName, courseSchema);
