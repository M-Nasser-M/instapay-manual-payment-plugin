import * as z from "zod";

export const phoneNumberSchema = z
  .string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string",
  })
  .length(11, "Phone number must be 11 digits")
  .startsWith("0100", "Phone number must start with 0100")
  .regex(/^\d+$/, "Phone number must contain only digits (0–9)");

export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
