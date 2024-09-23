import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import roomService from "./room.service";
import { IRoom } from "./room.interface";

const createRoom = catchAsync(async (req, res) => {
  const response = await roomService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room created successfully",
    data: response,
  });
});

const getAllRooms = catchAsync(async (_req, res) => {
  const response = await roomService.getAllRooms();

  if (!response.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No rooms found",
      data: response,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: response,
  });
});

const getRoomById = catchAsync(async (req, res) => {
  const response = await roomService.getRoomById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: response,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const response = await roomService.update(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: response,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const data = await roomService.deleteRoom(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    data,
  });
});

const roomController = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};

export default roomController;
