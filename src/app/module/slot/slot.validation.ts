import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

export const createSlotSchemaValidation = z.object({
  body: z.object({
    room: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid room ID",
    }),
    date: z.coerce.date(),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM"),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM"),
    isBooked: z.boolean().default(false),
  }),
});

const SlotValidation = {
  createSlot: createSlotSchemaValidation,
};

export default SlotValidation;
