import mongoose, { InferSchemaType } from "mongoose";

import { departmentModelName } from "../department.model";

const courseModelName = "Course";

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
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
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
  creditHours: {
    type: Number,
    required: true,
  },
  prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courseModelName,
    },
  ],
});

type CourseType = InferSchemaType<typeof courseSchema>;

const CourseModel = mongoose.model<CourseType>(courseModelName, courseSchema);

export { CourseModel, CourseType, courseModelName };
