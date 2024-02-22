import mongoose, { InferSchemaType } from "mongoose";

const slotSchema = new mongoose.Schema({
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

export type SlotType = InferSchemaType<typeof slotSchema>;
export const slotModelName = "Slot";

const Slot = mongoose.model(slotModelName, slotSchema);

export default Slot;
