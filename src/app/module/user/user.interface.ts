import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// User interface
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
}

// User model interface
export interface UserModel extends Model<IUserDocument> {
  isUserExistsByEmail(email: string): Promise<IUserDocument | null>;
}

// User document interface
export interface IUserDocument extends TUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
