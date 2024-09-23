import { ISlot, ISlotDocument } from "./slot.interface";
import { Slot } from "./slot.model";
import generateSlots from "./slot.utils";

const create = async (data: ISlot) => {
  const { room, date, startTime, endTime } = data;
  const slotDuration = 60;
  const slots = generateSlots({ startTime, endTime, slotDuration });
  const slotDocuments = slots.map((slot) => ({
    room,
    date: new Date(date),
    startTime: slot.startTime,
    endTime: slot.endTime,
    isBooked: false,
  }));

  const createdSlots = await Slot.insertMany(slotDocuments);
  return createdSlots;
};

interface IGetAvailableSlotsOptions {
  date?: string;
  roomId?: string;
}

const getAvailableSlots = async (options: IGetAvailableSlotsOptions) => {
  const query: any = { isBooked: false };

  if (options.date) {
    query.date = options.date;
  }

  if (options.roomId) {
    query.room = options.roomId;
  }

  const availableSlots = await Slot.find(query).populate("room");
  return availableSlots;
};

const getAllSlots = async () => {
  // const slots = await Slot.find({ isDeleted: false });
  return [];
};

const getSlotById = async (id: string) => {
  // const slot = await Slot.findById(id);
  return null;
};

const update = async (id: string, updateData: ISlot) => {
  // const updatedSlot = await Slot.findOneAndUpdate(
  //   { _id: id, isDeleted: false },
  //   { $set: updateData },
  //   { new: true, runValidators: true }
  // );
  return updateData;
};

const deleteSlot = async (id: string) => {
  // const slot = await Slot.findById(id);
  // if (!slot) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  // }
  // if (slot.isDeleted) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Slot already deleted");
  // }
  // await slot.updateOne({ isDeleted: true });
  // return slot;
  return null;
};

const slotService = {
  create,
  getAvailableSlots,
  getAllSlots,
  getSlotById,
  update,
  deleteSlot,
};

export default slotService;
