import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { foreignKey } from "../schema";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";

export const sectionModelName = "Section";

export interface ISection extends mongoose.Document {
  group: string;
  hall: mongoose.Schema.Types.ObjectId;
  slot: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  semester: mongoose.Schema.Types.ObjectId;
}

export type SectionType = Omit<ISection, keyof mongoose.Document>;

const sectionSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  hall: foreignKey(hallModelName),
  slot: foreignKey(slotModelName),
  course: foreignKey(courseModelName),
  semester: foreignKey(semesterModelName),
});

export const SectionModel =
  mongoose.models.Section ||
  mongoose.model<ISection>(sectionModelName, sectionSchema);
