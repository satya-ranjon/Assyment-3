import { Document, Types } from "mongoose";

export interface IBaseBooking {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: Date;
}

export interface IBooking extends IBaseBooking {
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
}

export interface IBookingDocument extends IBooking, Document {}
