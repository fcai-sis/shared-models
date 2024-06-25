import mongoose from "mongoose";

import { hallModelName } from "./hall.model";
import { slotModelName } from "./slot.model";
import { foreignKey, LocalizedFields } from "../schema";
import { courseModelName } from "./course.model";
import { semesterModelName } from "./semester.model";

export const sectionModelName = "Section";

export interface ISection extends mongoose.Document {
  /**
   * The hall in which the section/lab is being taught.
   */
  hall: mongoose.Schema.Types.ObjectId;

  /**
   * The time slot of the section/lab.
   */
  slot: mongoose.Schema.Types.ObjectId;

  /**
   * The course being taught in the section/lab.
   */
  course: mongoose.Schema.Types.ObjectId;

  /**
   * The semester in which the section/lab is being taught.
   */
  semester: mongoose.Schema.Types.ObjectId;

  /**
   * The group of the section/lab.
   */
  group: string;
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

export const sectionLocalizedFields: LocalizedFields<
  Omit<SectionType, "semester">
> = {
  course: {
    en: "Course",
    ar: "المقرر",
  },
  hall: {
    en: "Hall",
    ar: "القاعة",
  },
  slot: {
    en: "Slot",
    ar: "الفترة",
  },
  group: {
    en: "Group",
    ar: "المجموعة",
  },
};
