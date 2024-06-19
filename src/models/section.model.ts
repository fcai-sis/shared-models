import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { scheduleModelName } from "./schedule.model";
import { taTeachingModelName } from "./taTeaching.model";
import { foreignKey } from "../schema";

export const sectionModelName = "Section";

export interface ISection extends mongoose.Document {
  groupName: string;
  scheduleId: mongoose.Schema.Types.ObjectId;
  hallId: mongoose.Schema.Types.ObjectId;
  slotId: mongoose.Schema.Types.ObjectId;
  teachingId: mongoose.Schema.Types.ObjectId;
}

export type SectionType = Omit<ISection, keyof mongoose.Document>;

const sectionSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  schedule: foreignKey(scheduleModelName),
  hall: foreignKey(hallModelName),
  slot: foreignKey(slotModelName),
  taTeaching: foreignKey(taTeachingModelName),
});

export const SectionModel =
  mongoose.models.Section ||
  mongoose.model<ISection>(sectionModelName, sectionSchema);
