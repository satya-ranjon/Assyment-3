import { model, Schema } from "mongoose";
import { ISlotDocument } from "./slot.interface";

const slotSchema = new Schema<ISlotDocument>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { versionKey: false }
);

// Add a compound index for uniqueness
slotSchema.index(
  { room: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

// Mongoose model
export const Slot = model<ISlotDocument>("Slot", slotSchema);
