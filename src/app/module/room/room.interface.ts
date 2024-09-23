import { Document } from "mongoose";

export interface IRoom {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}

export interface IRoomDocument extends IRoom, Document {}
