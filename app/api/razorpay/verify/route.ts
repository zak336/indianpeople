import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingDetails
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || process.env.key_secret;

    if (!secret) {
      return NextResponse.json({ error: "Razorpay secret is missing" }, { status: 500 });
    }

    // 1. Verify cryptographic signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Payment is authentic. Save booking to Supabase.
    if (bookingDetails) {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          plan: bookingDetails.plan,
          retreat_date: bookingDetails.retreatDate,
          addons: bookingDetails.addons,
          amount_paid: bookingDetails.amount, // in paise
          razorpay_order_id,
          razorpay_payment_id
        }]);
        
      if (error) {
        // Log the error but don't fail the request, the user has already paid
        console.error("Failed to save booking to Supabase. Critical database sync needed:", error);
      }
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Razorpay Verification Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to verify payment";
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
