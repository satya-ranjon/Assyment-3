import { Router } from "express";
import UserRoutes from "../module/user/user.route";
import RoomRoutes from "../module/room/room.route";
import SlotRoutes from "../module/slot/slot.route";
import BookingRoutes from "../module/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/",
    route: RoomRoutes,
  },
  {
    path: "/",
    route: SlotRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
