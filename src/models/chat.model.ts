import mongoose from "mongoose";
import { userModelName } from "./user.model";
import { foreignKey } from "schema";

export const chatModelName = "Chat";

export interface IChat extends mongoose.Document {
  messages: { sender: string; message: string; sentAt: Date }[];
  participants: mongoose.Schema.Types.ObjectId[];
}

export type ChatType = Omit<IChat, keyof mongoose.Document>;

const chatSchema = new mongoose.Schema<IChat>({
  // messages is an array of {sender: string, message: string, sentAt: Date}
  messages: [
    {
      sender: foreignKey(userModelName),
      message: {
        type: String,
        required: true,
      },
      sentAt: {
        type: Date,
        required: true,
      },
    },
  ],
  // participants is an array of ObjectIds
  participants: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: userModelName,
    },
  ],
});

export const ChatModel =
  mongoose.models[chatModelName] ||
  mongoose.model<IChat>(chatModelName, chatSchema);
