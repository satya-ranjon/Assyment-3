import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Slot } from "../slot/slot.model";
import { IBaseBooking, IBooking } from "./booking.interface";
import { Room } from "../room/room.model";
import { Booking } from "./booking.model";
import mongoose from "mongoose";

const createBooking = async (booking: IBaseBooking) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const slots = await Slot.find({
      _id: { $in: booking.slots },
      isBooked: false,
      date: booking.date,
    });

    if (slots.length !== booking.slots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Some slots are already booked"
      );
    }

    const room = await Room.findById(booking.room);

    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, "Room not found");
    }

    const totalAmount = room.pricePerSlot * booking.slots.length;

    const newBooking = new Booking({
      ...booking,
      totalAmount,
    });

    await newBooking.save({ session });

    await Slot.updateMany(
      { _id: { $in: booking.slots } },
      { $set: { isBooked: true } },
      { session }
    );
    await session.commitTransaction();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("slots")
      .populate("room")
      .populate("user");

    return populatedBooking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllBookings = async () => {
  return await Booking.find({ isDeleted: false })
    .populate("slots")
    .populate("room")
    .populate("user");
};

const getUserBookings = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
  }

  return await Booking.find({ user: userId, isDeleted: false })
    .populate("slots")
    .populate("room")
    .populate("user");
};

const updateBooking = async (bookingId: string, updateData: IBooking) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid booking ID");
  }
  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: bookingId, isDeleted: false },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  return updatedBooking;
};

const deleteBooking = async (bookingId: string) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid booking ID");
  }
  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: bookingId, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true, runValidators: true }
  );

  if (!updatedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  return updatedBooking;
};

const bookingService = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};

export default bookingService;
