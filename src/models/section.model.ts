import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { scheduleModelName } from "./schedule.model";
import { taTeachingModelName } from "./taTeaching.model";
import { foreignKey } from "../schema";

export const sectionModelName = "Section";

export interface ISection extends mongoose.Document {
  groupName: Number;
  schedule: mongoose.Schema.Types.ObjectId;
  hall: mongoose.Schema.Types.ObjectId;
  slot: mongoose.Schema.Types.ObjectId;
  taTeaching: mongoose.Schema.Types.ObjectId;
}

export type SectionType = Omit<ISection, keyof mongoose.Document>;

const sectionSchema = new mongoose.Schema({
  groupName: {
    type: Number,
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
