import mongoose, { InferSchemaType } from "mongoose";

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

type HallType = InferSchemaType<typeof HallSchema>;
const hallModelName = "Hall";
const Hall = mongoose.model<HallType>(hallModelName, HallSchema);

export { Hall, HallSchema, hallModelName };
