<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  instapay  Manual Payment Plugin
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  A Medusa.js payment provider plugin for instapay  manual payments with phone number validation
</p>

## Overview

This plugin provides a manual payment provider for instapay , a popular mobile payment service in Egypt and other African countries. The plugin includes:

- **Phone Number Validation**: Ensures phone numbers start with `0100` and are exactly 11 digits
- **Manual Payment Processing**: Allows customers to receive payment instructions and admins to verify payments manually
- **Admin Interface**: Provides endpoints for payment verification and status management
- **Store Interface**: Handles payment initiation with proper validation

## Features

- ✅ **Strict Phone Validation**: Only accepts instapay numbers (0100XXXXXXX format)
- ✅ **Payment Instructions**: Provides clear step-by-step payment instructions to customers
- ✅ **Admin Verification**: Allows admins to verify and manage payments manually
- ✅ **Error Handling**: Comprehensive error handling with detailed validation messages
- ✅ **TypeScript Support**: Fully typed implementation following Medusa best practices

## Compatibility

This plugin is compatible with versions >= 2.4.0 of `@medusajs/medusa`.

## Installation

1. Install the plugin in your Medusa project:

```bash
npm install instapay-manual-payment-plugin
# or
yarn add instapay-manual-payment-plugin
```

2. Add the plugin to your `medusa-config.js`:

```javascript
module.exports = {
  plugins: [
    {
      resolve: "instapay-manual-payment-plugin",
      options: {
        debug: false, // Optional: enable debug logging
      },
    },
  ],
  modules: {
    paymentProviders: {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "instapay-manual-payment-plugin/providers/instapay",
            id: "instapay",
            options: {
              debug: false,
            },
          },
        ],
      },
    },
  },
};
```

## Usage

### Customer Payment Flow

1. **Payment Initiation**: Customer selects instapay at checkout
2. **Phone Number Entry**: Customer provides their instapay number (must start with 0100)
3. **Payment Instructions**: Customer receives detailed payment instructions
4. **Manual Payment**: Customer completes payment via instapay app or USSD
5. **Order Pending**: Order remains pending until admin verification

### Admin Verification Flow

1. **Payment Review**: Admin reviews pending instapay payments
2. **Verification**: Admin verifies payment receipt and updates status
3. **Order Completion**: Verified payments trigger order completion

## API Endpoints

### Store API

#### GET `/store/plugin`

Get plugin information and supported formats.

**Response:**

```json
{
  "message": "instapay  Payment Provider",
  "provider_id": "instapay",
  "supported_currencies": ["EGP"],
  "phone_format": "0100XXXXXXX (11 digits starting with 0100)"
}
```

#### POST `/store/plugin`

Initiate a instapay payment.

**Request Body:**

```json
{
  "phone_number": "01001234567",
  "customer_name": "John Doe",
  "amount": 1000,
  "currency_code": "EGP"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "instapay_1234567890_abc123",
    "provider_id": "instapay",
    "amount": 1000,
    "currency_code": "EGP",
    "phone_number": "0100 123 4567",
    "status": "pending",
    "payment_instructions": {
      "message": "Please send 1000 EGP via instapay ",
      "phone_number": "0100 123 4567",
      "steps": [
        "Open your instapay  app or dial *9*",
        "Send 1000 EGP to the merchant",
        "Keep your transaction reference number",
        "Your order will be confirmed once payment is verified"
      ]
    }
  }
}
```

### Admin API

#### GET `/admin/plugin`

List pending instapay payments.

**Query Parameters:**

- `status`: Filter by payment status
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)

#### POST `/admin/plugin`

Verify a instapay payment.

**Request Body:**

```json
{
  "payment_id": "instapay_1234567890_abc123",
  "transaction_reference": "VF123456789",
  "verified": true,
  "admin_notes": "Payment verified via instapay  statement"
}
```

#### PATCH `/admin/plugin`

Update payment status.

**Request Body:**

```json
{
  "payment_id": "instapay_1234567890_abc123",
  "status": "verified",
  "admin_notes": "Payment confirmed"
}
```

## Phone Number Validation

The plugin enforces strict validation for instapay phone numbers:

- **Format**: Must start with `0100`
- **Length**: Exactly 11 digits
- **Pattern**: `0100XXXXXXX` where X is any digit (0-9)

**Valid Examples:**

- `01001234567`
- `01009876543`
- `0100 123 4567` (spaces are automatically removed)

**Invalid Examples:**

- `01101234567` (doesn't start with 0100)
- `0100123456` (too short)
- `010012345678` (too long)
- `0100abcd567` (contains non-digits)

## Error Handling

The plugin provides detailed error messages for various scenarios:

### Validation Errors

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "phone_number",
      "message": "Phone number must start with 0100 and be exactly 11 digits"
    }
  ]
}
```

### Payment Errors

```json
{
  "success": false,
  "error": "Invalid instapay  phone number",
  "code": "INVALID_PHONE_NUMBER",
  "detail": "Phone number must start with 0100 and be exactly 11 digits (e.g., 01001234567)"
}
```

## Development

### Building the Plugin

```bash
npm run build
# or
yarn build
```

### Development Mode

```bash
npm run dev
# or
yarn dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Learn more about [Medusa’s architecture](https://docs.medusajs.com/learn/introduction/architecture) and [commerce modules](https://docs.medusajs.com/learn/fundamentals/modules/commerce-modules) in the Docs.

## Community & Contributions

The community and core team are available in [GitHub Discussions](https://github.com/medusajs/medusa/discussions), where you can ask for support, discuss roadmap, and share ideas.

Join our [Discord server](https://discord.com/invite/medusajs) to meet other community members.

## Other channels

- [GitHub Issues](https://github.com/medusajs/medusa/issues)
- [Twitter](https://twitter.com/medusajs)
- [LinkedIn](https://www.linkedin.com/company/medusajs)
- [Medusa Blog](https://medusajs.com/blog/)
