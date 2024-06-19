import mongoose from "mongoose";

import { courseModelName } from "./course.model";
import { teachingAssistantModelName } from "./ta.model";
import { semesterModelName } from "./semester.model";
import { foreignKey } from "../schema";

export const taTeachingModelName = "TaTeaching";

export interface ITaTeaching extends mongoose.Document {
  ta: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
}

export type TaTeachingType = Omit<ITaTeaching, keyof mongoose.Document>;

const taTeachingSchema = new mongoose.Schema<ITaTeaching>({
  ta: foreignKey(teachingAssistantModelName),
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
});

export const TaTeachingModel =
  mongoose.models.TaTeaching ||
  mongoose.model<ITaTeaching>(taTeachingModelName, taTeachingSchema);
