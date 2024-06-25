import mongoose from "mongoose";

import { integerValidator } from "../validators";
import { LocalizedEnum } from "../schema";

export const slotModelName = "Slot";

export const DayEnum = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;
export type DayEnumType = (typeof DayEnum)[number];

export interface ISlot extends mongoose.Document {
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
  day: DayEnumType;
}

export type SlotType = Omit<ISlot, keyof mongoose.Document>;

const slotSchema = new mongoose.Schema<ISlot>({
  start: {
    hour: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          integerValidator("Start Time Hour", v);
          return v >= 0 && v <= 23;
        },
      },
    },
    minute: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          integerValidator("Start Time Minute", v);
          return v >= 0 && v <= 59;
        },
      },
    },
  },
  end: {
    hour: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          integerValidator("End Time Hour", v);
          return v >= 0 && v <= 23;
        },
      },
    },
    minute: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          integerValidator("End Time Minute", v);
          return v >= 0 && v <= 59;
        },
      },
    },
  },
  day: {
    type: String,
    enum: DayEnum,
    required: true,
  },
});

export const SlotModel =
  mongoose.models[slotModelName] ||
  mongoose.model<ISlot>(slotModelName, slotSchema);

export const dayLocalizedEnum: LocalizedEnum<DayEnumType> = {
  SUNDAY: { ar: "الأحد", en: "Sunday" },
  MONDAY: { ar: "الاثنين", en: "Monday" },
  TUESDAY: { ar: "الثلاثاء", en: "Tuesday" },
  WEDNESDAY: { ar: "الأربعاء", en: "Wednesday" },
  THURSDAY: { ar: "الخميس", en: "Thursday" },
  FRIDAY: { ar: "الجمعة", en: "Friday" },
  SATURDAY: { ar: "السبت", en: "Saturday" },
};
