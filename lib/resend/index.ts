import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL || 'hello@softwarise.io';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://softwarise.io';

// ── Welcome Email ──────────────────────────────────────────
export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: `Softwarise <${FROM}>`,
    to,
    subject: 'Welcome to Softwarise',
    html: `
      <div style="font-family: Inter, sans-serif; background: #0B0B0D; color: #fff; padding: 48px 32px; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <span style="color: #D4AF37; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Softwarise</span>
        </div>
        <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 16px; color: #fff;">Welcome, ${name}.</h1>
        <p style="color: #A1A1AA; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          You've joined the premier software economy platform. Whether you're buying, selling, raising capital, or building — you're in the right place.
        </p>
        <a href="${APP_URL}/dashboard" style="display: inline-block; background: #D4AF37; color: #0B0B0D; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 15px;">
          Go to Dashboard →
        </a>
        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);">
          <p style="color: #A1A1AA; font-size: 13px;">Softwarise — Where software becomes opportunity.</p>
        </div>
      </div>
    `,
  });
}

// ── Offer Received ─────────────────────────────────────────
export async function sendOfferReceivedEmail({
  to,
  sellerName,
  listingTitle,
  offerAmount,
  buyerName,
  offerUrl,
}: {
  to: string;
  sellerName: string;
  listingTitle: string;
  offerAmount: string;
  buyerName: string;
  offerUrl: string;
}) {
  return resend.emails.send({
    from: `Softwarise <${FROM}>`,
    to,
    subject: `New offer on "${listingTitle}"`,
    html: `
      <div style="font-family: Inter, sans-serif; background: #0B0B0D; color: #fff; padding: 48px 32px; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <span style="color: #D4AF37; font-size: 24px; font-weight: 700;">Softwarise</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">You've received an offer.</h1>
        <p style="color: #A1A1AA; margin-bottom: 24px;">Hi ${sellerName}, <strong style="color: #fff;">${buyerName}</strong> has placed an offer on <strong style="color: #D4AF37;">${listingTitle}</strong>.</p>
        <div style="background: #111214; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <p style="color: #A1A1AA; font-size: 13px; margin: 0 0 4px;">Offer Amount</p>
          <p style="font-size: 32px; font-weight: 700; color: #D4AF37; margin: 0;">${offerAmount}</p>
        </div>
        <a href="${offerUrl}" style="display: inline-block; background: #D4AF37; color: #0B0B0D; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;">
          Review Offer →
        </a>
      </div>
    `,
  });
}

// ── New Message ────────────────────────────────────────────
export async function sendNewMessageEmail({
  to,
  recipientName,
  senderName,
  messagePreview,
  conversationUrl,
}: {
  to: string;
  recipientName: string;
  senderName: string;
  messagePreview: string;
  conversationUrl: string;
}) {
  return resend.emails.send({
    from: `Softwarise <${FROM}>`,
    to,
    subject: `New message from ${senderName}`,
    html: `
      <div style="font-family: Inter, sans-serif; background: #0B0B0D; color: #fff; padding: 48px 32px; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <span style="color: #D4AF37; font-size: 24px; font-weight: 700;">Softwarise</span>
        </div>
        <h1 style="font-size: 22px; font-weight: 600; margin-bottom: 8px;">New message from ${senderName}</h1>
        <p style="color: #A1A1AA; margin-bottom: 20px;">Hi ${recipientName},</p>
        <div style="background: #111214; border-left: 3px solid #D4AF37; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <p style="color: #fff; font-style: italic; margin: 0;">"${messagePreview}"</p>
        </div>
        <a href="${conversationUrl}" style="display: inline-block; background: #D4AF37; color: #0B0B0D; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;">
          Reply →
        </a>
      </div>
    `,
  });
}

// ── Listing Approved ───────────────────────────────────────
export async function sendListingApprovedEmail({
  to,
  name,
  listingTitle,
  listingUrl,
}: {
  to: string;
  name: string;
  listingTitle: string;
  listingUrl: string;
}) {
  return resend.emails.send({
    from: `Softwarise <${FROM}>`,
    to,
    subject: `Your listing "${listingTitle}" is now live`,
    html: `
      <div style="font-family: Inter, sans-serif; background: #0B0B0D; color: #fff; padding: 48px 32px; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <span style="color: #D4AF37; font-size: 24px; font-weight: 700;">Softwarise</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Your listing is live. ✓</h1>
        <p style="color: #A1A1AA; margin-bottom: 24px;">Hi ${name}, <strong style="color: #fff;">${listingTitle}</strong> has been approved and is now visible to thousands of qualified buyers.</p>
        <a href="${listingUrl}" style="display: inline-block; background: #D4AF37; color: #0B0B0D; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;">
          View Listing →
        </a>
      </div>
    `,
  });
}
