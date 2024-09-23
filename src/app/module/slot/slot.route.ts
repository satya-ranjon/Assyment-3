import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import SlotValidation from "./slot.validation";
import slotController from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.createSlot),
  slotController.createSlot
);

route.get("/slots/availability", slotController.getAvailableSlots);

const SlotRoutes = route;

export default SlotRoutes;
