import mongoose from "mongoose";

export interface IHall extends mongoose.Document {
  name: string;
  capacity: number;
}

const HallSchema = new mongoose.Schema<IHall>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

export const hallModelName = "Hall";

export const Hall = mongoose.models.Hall || mongoose.model<IHall>(hallModelName, HallSchema);
