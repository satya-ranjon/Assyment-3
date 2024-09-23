import { z } from "zod";

export const userSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(12, "Phone number must be at least 12 digits long"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(["user", "admin"]).default("user"),
  }),
});

export const userLoginValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const UserValidation = {
  signUpUser: userSignUpValidationSchema,
  loginUser: userLoginValidation,
};
export default UserValidation;
