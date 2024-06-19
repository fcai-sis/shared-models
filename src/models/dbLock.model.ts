import mongoose from "mongoose";

export const dbLockModelName = "DBLock";

export interface IDBLock extends mongoose.Document {
  lockName: string;
}

const dbLockSchema = new mongoose.Schema<IDBLock>({
  lockName: { type: String, required: true },
});

export const DBLock =
  mongoose.models.DBLock ||
  mongoose.model<IDBLock>(dbLockModelName, dbLockSchema);
