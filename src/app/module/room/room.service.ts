import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IRoom } from "./room.interface";
import { Room } from "./room.model";

const create = async (data: IRoom) => {
  const room = await Room.create(data);
  return room;
};

const getAllRooms = async () => {
  const rooms = await Room.find({ isDeleted: false });
  return rooms;
};

const getRoomById = async (id: string) => {
  const room = await Room.findById(id);

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  if (room.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room deleted");
  }

  return room;
};

const update = async (id: string, updateData: IRoom) => {
  const updatedRoom = await Room.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  return updatedRoom;
};

const deleteRoom = async (id: string) => {
  const room = await Room.findById(id);

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  if (room.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room already deleted");
  }

  await room.updateOne({ isDeleted: true });

  return room;
};

const roomService = {
  create,
  getAllRooms,
  getRoomById,
  update,
  deleteRoom,
};

export default roomService;
