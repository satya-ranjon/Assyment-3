import { model, Schema } from "mongoose";
import { IUserDocument, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round)
    );
  }
  next();
});

userSchema.statics.isUserExistsByEmail = async function (
  email: string
): Promise<IUserDocument | null> {
  return this.findOne({ email }).select("+password");
};

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = await User.findById(this._id).select("+password");
  if (!user || !user.password) return false;
  return bcrypt.compare(candidatePassword, user.password);
};

export const User = model<IUserDocument, UserModel>("User", userSchema);
