import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";

// Validation schema for instapay  phone number
const instapaySchema = z.object({
  phone_number: z
    .string()
    .regex(
      /^0100\d{7}$/,
      "Phone number must start with 0100 and be exactly 11 digits"
    )
    .transform((phone) => phone.replace(/\s+/g, "").replace(/[^\d]/g, "")),
  customer_name: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  currency_code: z.string().default("EGP"),
});

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  res.json({
    message: "instapay  Payment Provider",
    provider_id: "instapay",
    supported_currencies: ["EGP"],
    phone_format: "0100XXXXXXX (11 digits starting with 0100)",
  });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Validate request body
    const validatedData = instapaySchema.parse(req.body);

    const { phone_number, customer_name, amount, currency_code } =
      validatedData;

    // Format phone number for display
    const formattedPhone = `${phone_number.slice(0, 4)} ${phone_number.slice(
      4,
      7
    )} ${phone_number.slice(7)}`;

    // Create payment session data
    const paymentSession = {
      id: `instapay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      provider_id: "instapay",
      amount,
      currency_code,
      phone_number: formattedPhone,
      customer_name,
      status: "pending",
      created_at: new Date().toISOString(),
      payment_instructions: {
        message: `Please send ${amount} ${currency_code} via instapay `,
        phone_number: formattedPhone,
        steps: [
          "Open your instapay  app or dial *9*",
          `Send ${amount} ${currency_code} to the merchant`,
          "Keep your transaction reference number",
          "Your order will be confirmed once payment is verified",
        ],
      },
    };

    res.status(201).json({
      success: true,
      data: paymentSession,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}
