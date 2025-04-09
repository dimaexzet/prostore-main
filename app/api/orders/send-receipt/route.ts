import { NextRequest, NextResponse } from 'next/server';
import { sendOrderReceipt } from '@/lib/actions/order.actions';
import { auth } from '@/auth';

// POST endpoint to send an order receipt
export async function POST(req: NextRequest) {
  try {
    // Authenticate the request
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Send the receipt
    const result = await sendOrderReceipt(orderId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Receipt sent successfully',
    });
  } catch (error) {
    console.error('Error sending receipt:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send receipt' },
      { status: 500 }
    );
  }
} 