import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import RoomValidation from "./room.validation";
import roomController from "./room.controller";

const route = Router();

route.post(
  "/room",
  validateRequest(RoomValidation.createRoom),
  roomController.createRoom
);

route.get("/rooms", roomController.getAllRooms);
route.get("/rooms/:id", roomController.getRoomById);
route.put(
  "/rooms/:id",
  validateRequest(RoomValidation.updateRoom),
  roomController.updateRoom
);
route.delete("/rooms/:id", roomController.deleteRoom);

const RoomRoutes = route;

export default RoomRoutes;
