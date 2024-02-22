import mongoose, { InferSchemaType } from "mongoose";

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

export type HallType = InferSchemaType<typeof HallSchema>;
export const hallModelName = "Hall";
const Hall = mongoose.model(hallModelName, HallSchema);

export default Hall;
