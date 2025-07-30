import crypto from "node:crypto";

import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  CreateAccountHolderInput,
  CreateAccountHolderOutput,
  DeleteAccountHolderInput,
  DeleteAccountHolderOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types";
import {
  AbstractPaymentProvider,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils";
import { PhoneNumber, phoneNumberSchema } from "../types";

interface instapayManualAuthorizeInput extends AuthorizePaymentInput {
  data: {
    phone_number: PhoneNumber;
  };
}

export class instapayManualBase extends AbstractPaymentProvider {
  static identifier = "instapay-manual";

  async getStatus(_): Promise<string> {
    return "pending";
  }

  validatePhoneNumber(phoneNumber: PhoneNumber): void {
    phoneNumberSchema.parse(phoneNumber);
  }

  async getPaymentData(input: any): Promise<Record<string, unknown>> {
    return {
      provider_id: this.constructor.name,
      manual_payment: true,
      requires_confirmation: true,
    };
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const sessionId = crypto.randomUUID();
    return { id: sessionId };
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    throw new Error("Method not implemented.");
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    return {};
  }

  async authorizePayment(
    input: instapayManualAuthorizeInput
  ): Promise<AuthorizePaymentOutput> {
    const phone_number = input.data.phone_number;
    this.validatePhoneNumber(phone_number);
    return { data: { phone_number }, status: PaymentSessionStatus.AUTHORIZED };
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: {} };
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: {} };
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    return { data: { status: PaymentSessionStatus.CAPTURED } };
  }

  async createAccountHolder(
    input: CreateAccountHolderInput
  ): Promise<CreateAccountHolderOutput> {
    return { id: input.context.customer.id };
  }

  async deleteAccountHolder(
    input: DeleteAccountHolderInput
  ): Promise<DeleteAccountHolderOutput> {
    return { data: {} };
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return { data: {} };
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: {} };
  }

  async getWebhookActionAndData(
    data: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    return { action: PaymentActions.NOT_SUPPORTED };
  }
}

export default instapayManualBase;
