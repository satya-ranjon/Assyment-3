import { model, Model, Schema } from "mongoose";
import { IBookingDocument } from "./booking.interface";

export const bookingSchema = new Schema<IBookingDocument>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export const Booking = model<IBookingDocument>("Booking", bookingSchema);
