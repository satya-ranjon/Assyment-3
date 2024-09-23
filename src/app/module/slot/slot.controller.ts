import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import slotService from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const response = await slotService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot created successfully",
    data: response,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const response = await slotService.getAvailableSlots(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Available slots retrieved successfully",
    data: response,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const response = await slotService.getAllSlots();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slots retrieved successfully",
    data: response,
  });
});

const getSlotById = catchAsync(async (req, res) => {
  const response = await slotService.getSlotById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot retrieved successfully",
    data: response,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const response = await slotService.update(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot updated successfully",
    data: response,
  });
});

const deleteSlot = catchAsync(async (req, res) => {
  const data = await slotService.deleteSlot(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot deleted successfully",
    data,
  });
});

const slotController = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
};

export default slotController;
