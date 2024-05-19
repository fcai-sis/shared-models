import mongoose from "mongoose";

export interface IDBLock extends mongoose.Document {
  lock: boolean;
}

const dbLockSchema = new mongoose.Schema<IDBLock>({
  lock: { type: Boolean, required: true },
});

export const dbLockModelName = "DBLock";

export const DBLock = mongoose.models.DBLock || mongoose.model<IDBLock>(dbLockModelName, dbLockSchema);
