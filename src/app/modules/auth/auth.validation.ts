import { z } from "zod";
import { ERole } from "../user/user.interface";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(ERole),
    isBlocked: z.boolean().default(false),
  }),
});
