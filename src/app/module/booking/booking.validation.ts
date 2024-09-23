import { Types } from "mongoose";
import { z } from "zod";

const BookingValidationSchema = z.object({
  body: z.object({
    room: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid room ID",
    }),
    slots: z
      .array(
        z.string().refine((val) => Types.ObjectId.isValid(val), {
          message: "Invalid slot ID",
        })
      )
      .nonempty(),
    user: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    }),
    date: z.coerce.date(),
  }),
});

const BookingUpdateValidationSchema = z.object({
  body: z.object({
    isConfirmed: z
      .enum(["confirmed", "unconfirmed", "canceled"])
      .default("unconfirmed")
      .optional(),
  }),
});

const BookingValidation = {
  createValidation: BookingValidationSchema,
  updateValidation: BookingUpdateValidationSchema,
};

export default BookingValidation;
