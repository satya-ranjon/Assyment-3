import { Router } from "express";
import UserValidation from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import userController from "./user.controller";

const route = Router();

route.post(
  "/signup",
  validateRequest(UserValidation.signUpUser),
  userController.signup
);

route.post(
  "/login",
  validateRequest(UserValidation.loginUser),
  userController.login
);

const UserRoutes = route;

export default UserRoutes;
