import mongoose, { InferSchemaType } from "mongoose";
import { courseModelName } from "./course.model";

const prerequisiteSchema = new mongoose.Schema({
  courseCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModelName,
    required: true,
  },
  prerequisiteCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModelName,
    required: true,
  },
});

const prerequisiteModelName = "Prerequisite";

type PrerequisiteType = InferSchemaType<typeof prerequisiteSchema>;

const PrerequisiteModel = mongoose.model(
  prerequisiteModelName,
  prerequisiteSchema
);

export { PrerequisiteModel, PrerequisiteType, prerequisiteModelName };
