import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types";

// The widget
const OrderWidget = ({ data: order }: DetailWidgetProps<AdminOrder>) => {
  const payment = order.payment_collections?.[0]?.payments?.[0];
  console.log(payment);

  if (!payment) {
    return null;
  }

  const providerId = payment.provider_id;
  const paymentData = payment.data;

  let title = "";
  let value: string | null = null;

  if (
    providerId.includes("instapay") &&
    paymentData?.instapay_phone_or_handle
  ) {
    title = "Instapay Phone Number or Handle";
    value = paymentData.instapay_phone_or_handle as string;
  }

  if (!value) {
    return null;
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{title}</Heading>
      </div>
      <div className="grid grid-cols-2 gap-y-2 px-6 py-4">
        <p className="text-ui-fg-subtle">
          Instapay Phone Number or Handle
        </p>
        <p className="text-right">{value}</p>
      </div>
    </Container>
  );
};

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "order.details.after",
});

export default OrderWidget;
