import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Check if secrets are available
    if (!key_id || !key_secret) {
      console.error("Razorpay configuration missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.");
      return NextResponse.json({ 
        error: "Payment service configuration error. Please contact support." 
      }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const { amount, currency = "INR", receipt } = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ 
        error: "Valid amount is required" 
      }, { status: 400 });
    }

    // CRITICAL FIX: Convert rupees to paise (Razorpay requirement)
    // If amount is already in paise (>100000), assume it's correct
    // Otherwise, multiply by 100 to convert rupees to paise
    const amountInPaise = amount > 100000 ? amount : Math.round(amount * 100);

    // Generate unique receipt ID
    const receiptId = receipt || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const options = {
      amount: amountInPaise, // amount in paise (smallest currency unit)
      currency,
      receipt: receiptId,
      notes: {
        product: "Sync Retreat Booking",
        timestamp: new Date().toISOString(),
      }
    };

    console.log("Creating Razorpay order:", { 
      amount: amountInPaise, 
      currency, 
      receipt: receiptId 
    });

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ 
        error: "Failed to create order" 
      }, { status: 500 });
    }

    console.log("Razorpay order created successfully:", order.id);

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency,
      keyId: key_id // Safe to send to client
    }, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Razorpay Order Creation Error:", error);
    
    let errorMessage = "Failed to create Razorpay order";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      const errObj = error as Record<string, any>;
      if (errObj.error && errObj.error.description) {
        errorMessage = errObj.error.description;
      } else {
        try { errorMessage = JSON.stringify(error); } catch(_) {}
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
