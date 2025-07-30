import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";

// Validation schema for payment verification
const verifyPaymentSchema = z.object({
  payment_id: z.string().min(1, "Payment ID is required"),
  transaction_reference: z.string().optional(),
  verified: z.boolean(),
  admin_notes: z.string().optional(),
});

// Validation schema for payment status update
const updatePaymentStatusSchema = z.object({
  payment_id: z.string().min(1, "Payment ID is required"),
  status: z.enum(["pending", "verified", "failed", "refunded", "canceled"]),
  admin_notes: z.string().optional(),
});

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    // This endpoint could be used to list pending instapay  payments
    const { status, limit = 50, offset = 0 } = req.query;

    // In a real implementation, you would query the database for payments
    // For now, return mock data structure
    const mockPayments = {
      payments: [
        {
          id: "instapay_123456789",
          provider_id: "instapay",
          amount: 1000,
          currency_code: "EGP",
          phone_number: "0100 123 4567",
          customer_name: "John Doe",
          status: "pending",
          created_at: new Date().toISOString(),
          payment_instructions: {
            message: "Please send 1000 EGP via instapay ",
            phone_number: "0100 123 4567",
          },
        },
      ],
      count: 1,
      offset: Number(offset),
      limit: Number(limit),
    };

    res.json({
      success: true,
      data: mockPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch payments",
      message: error.message,
    });
  }
}

// Verify a instapay  payment
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const validatedData = verifyPaymentSchema.parse(req.body);
    const { payment_id, transaction_reference, verified, admin_notes } =
      validatedData;

    // In a real implementation, you would:
    // 1. Update the payment status in the database
    // 2. Trigger order completion if verified
    // 3. Send notifications to customer

    const verificationResult = {
      payment_id,
      status: verified ? "verified" : "failed",
      transaction_reference,
      admin_notes,
      verified_at: new Date().toISOString(),
      verified_by: "admin", // In real app, get from authenticated user context
    };

    res.json({
      success: true,
      message: verified
        ? "Payment verified successfully"
        : "Payment marked as failed",
      data: verificationResult,
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
      error: "Failed to verify payment",
      message: error.message,
    });
  }
}

// Update payment status
export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
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
        details: error.errors.map((err) => ({
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
