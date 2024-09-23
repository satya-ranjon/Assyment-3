import { z } from "zod";

export const RoomSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Room name is required"),
    roomNo: z.number().int().positive("Room number must be a positive integer"),
    floorNo: z
      .number()
      .int()
      .min(0, "Floor number must be a non-negative integer"),
    capacity: z.number().int().positive("Capacity must be a positive integer"),
    pricePerSlot: z
      .number()
      .positive("Price per slot must be a positive number"),
    amenities: z.array(z.string()).nonempty("At least one amenity is required"),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateRoomSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Room name is required").optional(),
    roomNo: z
      .number()
      .int()
      .positive("Room number must be a positive integer")
      .optional(),
    floorNo: z
      .number()
      .int()
      .min(0, "Floor number must be a non-negative integer")
      .optional(),
    capacity: z
      .number()
      .int()
      .positive("Capacity must be a positive integer")
      .optional(),
    pricePerSlot: z
      .number()
      .positive("Price per slot must be a positive number")
      .optional(),
    amenities: z
      .array(z.string())
      .nonempty("At least one amenity is required")
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const RoomValidation = {
  createRoom: RoomSchemaValidation,
  updateRoom: updateRoomSchemaValidation,
};

export default RoomValidation;
