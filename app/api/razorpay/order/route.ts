import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || process.env.key_id;
    const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.key_secret;

    // Check if secrets are available
    if (!key_id || !key_secret) {
      return NextResponse.json({ 
        error: "Razorpay keys are missing. Checked NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_ID, and key_id." 
      }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const { amount, currency = "INR", receipt } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount, // amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency,
      keyId: key_id
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
