import mongoose from "mongoose";

export interface ISlot extends mongoose.Document {
  startTime: {
    hour: number;
    minute: number;
  };
  endTime: {
    hour: number;
    minute: number;
  };
  day: number;
}

const slotSchema = new mongoose.Schema<ISlot>({
  startTime: {
    hour: { type: Number, required: true, min: 0, max: 23 },
    minute: { type: Number, required: true, min: 0, max: 59 },
  },
  endTime: {
    hour: { type: Number, required: true, min: 0, max: 23 },
    minute: { type: Number, required: true, min: 0, max: 59 },
  },
  day: { type: Number, required: true, min: 0, max: 6 },
});

export const slotModelName = "Slot";

export const Slot = mongoose.models.Slot || mongoose.model<ISlot>(slotModelName, slotSchema);
