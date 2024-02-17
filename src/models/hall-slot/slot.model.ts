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

type SlotType = InferSchemaType<typeof slotSchema>;
const slotModelName = "Slot";

const Slot = mongoose.model<SlotType>(slotModelName, slotSchema);

export { Slot, slotSchema, slotModelName };
