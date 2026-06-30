import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const PLATFORM_FEE_PERCENT = 5; // 5% platform fee

export async function createPaymentIntent({
  amount,
  currency = 'usd',
  metadata = {},
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    automatic_payment_methods: { enabled: true },
    metadata,
  });
}

export async function createEscrowPayment({
  amount,
  currency = 'usd',
  fromCustomerId,
  description,
  metadata = {},
}: {
  amount: number;
  currency?: string;
  fromCustomerId: string;
  description: string;
  metadata?: Record<string, string>;
}) {
  const platformFee = Math.round(amount * PLATFORM_FEE_PERCENT * 100) / 100;

  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    customer: fromCustomerId,
    description,
    application_fee_amount: Math.round(platformFee * 100),
    transfer_data: { destination: process.env.STRIPE_PLATFORM_ACCOUNT_ID! },
    metadata: { ...metadata, escrow: 'true', platform_fee: String(platformFee) },
  });
}

export async function createOrRetrieveCustomer(email: string, name: string) {
  const customers = await stripe.customers.list({ email, limit: 1 });

  if (customers.data.length > 0) {
    return customers.data[0];
  }

  return stripe.customers.create({ email, name });
}

export async function createSubscription({
  customerId,
  priceId,
}: {
  customerId: string;
  priceId: string;
}) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });
}

export const SUBSCRIPTION_PRICES = {
  pro_monthly: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
  enterprise_monthly: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_monthly',
};

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function constructWebhookEvent(payload: string, sig: string) {
  return stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}
