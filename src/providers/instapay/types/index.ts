import * as z from "zod";
export const instapayPhoneSchema = z
  .string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string",
  })
  .length(11, "Phone number must be 11 digits")
  .regex(
    /^(010|011|012|015)\d{8}$/,
    "Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015"
  );

export type InstapayPhone = z.infer<typeof instapayPhoneSchema>;

export const instapayHandleSchema = z
  .string({
    required_error: "Handle is required",
    invalid_type_error: "Handle must be a string",
  })
  .min(9, "Handle must be at least 9 characters long")
  .endsWith("@instapay", "Handle must end with @instapay");

export type InstapayHandle = z.infer<typeof instapayHandleSchema>;

export const instapayPhoneOrHandleSchema = z.union([
  instapayPhoneSchema,
  instapayHandleSchema,
]);

export type InstapayPhoneOrHandle = z.infer<typeof instapayPhoneOrHandleSchema>;
