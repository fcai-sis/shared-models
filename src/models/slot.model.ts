import mongoose from "mongoose";

import { integerValidator } from "../validators";

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
  startTime: {
    hour: number;
    minute: number;
  };
  endTime: {
    hour: number;
    minute: number;
  };
  day: DayEnumType;
}

export type SlotType = Omit<ISlot, keyof mongoose.Document>;

const slotSchema = new mongoose.Schema<ISlot>({
  startTime: {
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
  endTime: {
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
  mongoose.models.Slot || mongoose.model<ISlot>(slotModelName, slotSchema);
