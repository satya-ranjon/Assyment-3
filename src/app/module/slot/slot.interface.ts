import { Document, Types } from "mongoose";

export interface ISlot {
  room: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface ISlotDocument extends ISlot, Document {}
