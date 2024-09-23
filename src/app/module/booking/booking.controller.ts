import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import bookingService from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const response = await bookingService.createBooking(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: response,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const response = await bookingService.getAllBookings();

  if (!response.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No bookings found",
      data: response,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: response,
  });
});

const getUserBookings = catchAsync(async (req: any, res) => {
  const response = await bookingService.getUserBookings(req?.user?.id);

  if (!response.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No bookings found",
      data: response,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: response,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const response = await bookingService.updateBooking(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: response,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const response = await bookingService.deleteBooking(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking deleted successfully",
    data: response,
  });
});

const bookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};

export default bookingController;
