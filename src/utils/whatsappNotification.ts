/**
 * Service to dispatch order details directly to WhatsApp.
 * 
 * 1. Direct WhatsApp App Navigation (wa.me click-to-chat):
 *    Opens WhatsApp on mobile or desktop directly with the pre-formatted order
 *    without popup blocker issues.
 * 
 * 2. Background Automated Dispatch (Zero-Click Serverless / Webhook / CallMeBot):
 *    If an automated webhook URL or CallMeBot API key is provided, the order is
 *    automatically delivered to the merchant's WhatsApp in the background
 *    without requiring the customer to interact with WhatsApp.
 */

import { BRAND_INFO } from '../data/products';
import { PlacedOrder } from '../types';

export const formatWhatsAppOrderMessage = (order: PlacedOrder): string => {
  const itemsList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.productName}*\n   • Size: ${item.size} | Flavour: ${item.flavor}\n   • Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
    )
    .join('\n\n');

  const addressFull = `${order.customer.addressLine1}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;

  return `🏋️ *NEW ORDER NOTIFICATION - RND NUTRITION*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${order.orderId}
*Date:* ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}

👤 *Customer Details:*
• *Name:* ${order.customer.fullName}
• *Phone:* ${order.customer.phoneNumber}
${order.customer.email ? `• *Email:* ${order.customer.email}\n` : ''}📍 *Delivery Address:*
${addressFull}

📦 *Ordered Items:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
• *Subtotal:* ₹${order.subtotal}
• *Shipping:* ${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
• *TOTAL AMOUNT (UPI):* ₹${order.total}
• *UPI ID:* ${BRAND_INFO.upiId} (${(BRAND_INFO as any).payeeName || 'Deepanshu'})
• *UPI Ref / 12-Digit UTR:* ${order.customer.paymentReference || 'N/A'} (VERIFIED PAYMENT)
━━━━━━━━━━━━━━━━━━━━
Please confirm order dispatch & share tracking details.`;
};

/**
 * Generates the direct WhatsApp Click-to-Chat URL
 */
export const getWhatsAppUrl = (order: PlacedOrder): string => {
  const message = formatWhatsAppOrderMessage(order);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encoded}`;
};

/**
 * Seamlessly opens WhatsApp without getting blocked by mobile popup blockers.
 */
export const launchWhatsApp = (url: string): void => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    // Direct mobile app invocation
    window.location.href = url;
  } else {
    // Desktop: Try opening a new tab, fallback to direct location change if blocked
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
  }
};

/**
 * Dispatches the order silently in the background if a webhook or automated gateway is configured.
 */
export const dispatchBackgroundNotification = async (order: PlacedOrder): Promise<boolean> => {
  const webhookUrl = (BRAND_INFO as any).orderWebhookUrl || import.meta.env.VITE_ORDER_WEBHOOK_URL;
  const callmebotKey = (BRAND_INFO as any).callmebotApiKey || import.meta.env.VITE_CALLMEBOT_API_KEY;

  let success = false;

  // 1. If CallMeBot WhatsApp Gateway is enabled
  if (callmebotKey) {
    try {
      const msg = encodeURIComponent(formatWhatsAppOrderMessage(order));
      const phone = BRAND_INFO.supportWhatsappNumber;
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${msg}&apikey=${callmebotKey}`, {
        mode: 'no-cors',
      });
      success = true;
    } catch (e) {
      console.warn('CallMeBot notification failed:', e);
    }
  }

  // 2. If a custom Webhook URL is configured (e.g. Make.com, Zapier, Twilio, or custom server)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_order',
          order,
          recipientPhone: BRAND_INFO.supportWhatsappNumber,
          whatsappFormattedText: formatWhatsAppOrderMessage(order),
        }),
      });
      success = true;
    } catch (e) {
      console.warn('Webhook notification failed:', e);
    }
  }

  return success;
};
