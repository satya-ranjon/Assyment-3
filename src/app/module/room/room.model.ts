// Room schema

import { model, Schema } from "mongoose";
import { IRoomDocument } from "./room.interface";

const roomSchema = new Schema<IRoomDocument>(
  {
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export const Room = model<IRoomDocument>("Room", roomSchema);
