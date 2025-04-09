import { Resend } from 'resend';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import { Order } from '@/types';
require('dotenv').config();
import PurchaseReceiptEmail from './purchase-receipt';

// Create Resend instance if API key is available, otherwise create a mock
const resendApiKey = process.env.RESEND_API_KEY as string;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  console.log('Attempting to send email receipt');
  console.log('Resend API Key available:', !!resendApiKey);
  console.log('Customer email:', order.user.email);
  
  if (!resend) {
    console.log('Email sending disabled - no Resend API key provided');
    console.log('Would have sent purchase receipt to:', order.user.email);
    return;
  }

  try {
    console.log('Sending email via Resend to:', order.user.email);
    const senderEmail = SENDER_EMAIL || 'onboarding@resend.dev';
    const appName = APP_NAME || 'Prostore';
    
    console.log(`From: ${appName} <${senderEmail}>`);
    
    const result = await resend.emails.send({
      from: `${appName} <${senderEmail}>`,
      to: order.user.email,
      subject: `Order Confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
    
    console.log('Email sending result:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: true, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};
