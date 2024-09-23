import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";
import config from "../../config";

const createUser = async (userData: TUser) => {
  const user = await User.create(userData);
  return user.toObject({
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    },
  });
};

const loginUser = async (data: Pick<TUser, "email" | "password">) => {
  const existingUser = await User.isUserExistsByEmail(data.email);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatch = await existingUser.comparePassword(data.password);

  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const jwtPayload = {
    userId: existingUser.id,
    email: existingUser.email,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );

  return {
    user: existingUser.toObject({
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    }),
    token,
  };
};

const userService = {
  createUser,
  loginUser,
};

export default userService;
