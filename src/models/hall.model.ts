import mongoose from "mongoose";
import { integerValidator } from "../validators";

export const hallModelName = "Hall";

export interface IHall extends mongoose.Document {
  name: {
    en: string;
    ar: string;
  };
  capacity: number;
}

const hallSchema = new mongoose.Schema<IHall>({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  capacity: {
    type: Number,
    validate: {
      validator: (v: number) => integerValidator("Hall Capacity", v),
    },
    required: true,
  },
});

export const Hall =
  mongoose.models.Hall || mongoose.model<IHall>(hallModelName, hallSchema);
