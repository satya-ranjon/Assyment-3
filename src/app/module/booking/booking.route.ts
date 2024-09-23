import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import BookingValidation from "./booking.validation";
import bookingController from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createValidation),
  bookingController.createBooking
);

route.get("/bookings", auth(USER_ROLE.admin), bookingController.getAllBookings);
route.get(
  "/bookings/my-bookings",
  auth(USER_ROLE.user),
  bookingController.getUserBookings
);
route.put(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.updateValidation),
  bookingController.updateBooking
);
route.delete(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  bookingController.deleteBooking
);

const BookingRoutes = route;

export default BookingRoutes;
