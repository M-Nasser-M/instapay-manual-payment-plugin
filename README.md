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
  A manual payment provider for Medusa that processes Instapay Cash payments requiring manual verification before order completion
</p>

<p align="center">
  <strong>Repository:</strong> <a href="https://github.com/M-Nasser-M/instapay-manual-payment-plugin">GitHub</a>
</p>

## Compatibility

This plugin is compatible with Medusa v2.15.2 and above, and requires Node.js 22 or higher.

## Overview

This plugin provides a **manual payment provider** for Instapay Cash, a popular mobile payment service in Egypt. **Important:** This plugin requires manual verification by administrators for all payments. The plugin includes:

- **Phone/Handle Validation**: Validates that the customer provides a valid Egyptian phone number (11 digits starting with 010, 011, 012, or 015) or an Instapay handle (ending with `@instapay`)
- **Manual Payment Processing**: Allows customers to receive payment instructions and admins to verify payments manually
- **Admin Interface**: Provides endpoints for payment verification and status management
- **Store Interface**: Handles payment initiation with proper validation

## Features

- ✅ **Manual Verification Required**: All payments must be manually verified by administrators
- ✅ **Strict Phone/Handle Validation**: Only accepts Egyptian phone numbers or `@instapay` handles
- ✅ **Payment Instructions**: Provides clear step-by-step payment instructions to customers
- ✅ **Admin Management Interface**: Admin endpoints for payment verification and status management (placeholder — see note below)
- ✅ **TypeScript Support**: Fully typed implementation following Medusa best practices

## Installation

```bash
npm install @m-nasser-m/medusa-payment-instapay-manual
```

## Configuration

Register the provider with the Payment Module in your `medusa-config.ts`:

```ts
import { defineConfig } from "@medusajs/framework/utils"

module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@m-nasser-m/medusa-payment-instapay-manual/providers/instapay",
            id: "instapay-manual",
          },
        ],
      },
    },
  ],
})
```

## How It Works

1. The customer selects **Instapay Cash** during checkout and enters their phone number or Instapay handle.
2. The provider validates the input and authorizes the payment session (status `authorized`).
3. Payment instructions are shown to the customer.
4. The customer sends the amount via Instapay and keeps the transaction reference.
5. An administrator verifies the payment manually (e.g. by capturing the payment from the Medusa Admin), which completes the order.

> **Note:** The bundled admin API routes (`POST /admin/plugin`, `POST /admin/plugin/update-status`) are currently placeholder/demo endpoints and do not modify payments yet. Use the standard Medusa Admin payment capture flow to complete orders in the meantime.

