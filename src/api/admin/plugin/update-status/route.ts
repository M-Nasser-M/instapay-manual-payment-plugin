import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "@medusajs/framework/zod";

// Validation schema for payment status update
const updatePaymentStatusSchema = z.object({
  payment_id: z.string().min(1, "Payment ID is required"),
  status: z.enum(["pending", "verified", "failed", "refunded", "canceled"]),
  admin_notes: z.string().optional(),
});

// Update payment status
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const validatedData = updatePaymentStatusSchema.parse(req.body);
    const { payment_id, status, admin_notes } = validatedData;

    // In a real implementation, you would update the payment in the database
    const updatedPayment = {
      payment_id,
      status,
      admin_notes,
      updated_at: new Date().toISOString(),
      updated_by: "admin", // In real app, get from authenticated user context
    };

    res.json({
      success: true,
      message: `Payment status updated to ${status}`,
      data: updatedPayment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to update payment status",
      message: error.message,
    });
  }
}
