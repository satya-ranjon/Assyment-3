import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import RoomValidation from "./room.validation";
import roomController from "./room.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
  "/room",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.createRoom),
  roomController.createRoom
);

route.get("/rooms", roomController.getAllRooms);
route.get("/rooms/:id", roomController.getRoomById);
route.put(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.updateRoom),
  roomController.updateRoom
);
route.delete("/rooms/:id", auth(USER_ROLE.admin), roomController.deleteRoom);

const RoomRoutes = route;

export default RoomRoutes;
