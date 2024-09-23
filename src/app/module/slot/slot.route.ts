import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import SlotValidation from "./slot.validation";
import slotController from "./slot.controller";

const route = Router();

route.post(
  "/slots",
  validateRequest(SlotValidation.createSlot),
  slotController.createSlot
);

route.get("/slots/availability", slotController.getAvailableSlots);

const SlotRoutes = route;

export default SlotRoutes;
