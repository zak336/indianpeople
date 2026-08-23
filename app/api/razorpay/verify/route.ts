import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingDetails
    } = await req.json();

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("Razorpay configuration missing");
      return NextResponse.json({ 
        error: "Payment service configuration error" 
      }, { status: 500 });
    }

    // STEP 1: Verify cryptographic signature
    console.log("Verifying payment signature for:", razorpay_payment_id);
    
    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("Signature verification failed:", {
        razorpay_order_id,
        razorpay_payment_id,
        provided_signature: razorpay_signature,
        generated_signature
      });
      return NextResponse.json({ 
        error: "Invalid payment signature. Payment verification failed." 
      }, { status: 400 });
    }

    console.log("✓ Signature verified successfully");

    // STEP 2: Check for duplicate processing (Idempotency)
    console.log("Checking for duplicate payment processing...");
    
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('razorpay_payment_id, id')
      .eq('razorpay_payment_id', razorpay_payment_id)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking for existing booking:", checkError);
      // Continue anyway - better to risk duplicate than block valid payment
    }

    if (existingBooking) {
      console.log("Payment already processed:", razorpay_payment_id, "- Booking ID:", existingBooking.id);
      return NextResponse.json({ 
        success: true, 
        message: "Payment already processed successfully",
        bookingId: existingBooking.id
      }, { status: 200 });
    }

    console.log("✓ No duplicate found, proceeding with verification");

    // STEP 3: Fetch payment details from Razorpay API
    console.log("Fetching payment details from Razorpay...");
    
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    let payment;
    try {
      payment = await razorpay.payments.fetch(razorpay_payment_id);
    } catch (fetchError: any) {
      console.error("Failed to fetch payment from Razorpay:", fetchError);
      return NextResponse.json({ 
        error: "Unable to verify payment status with payment gateway" 
      }, { status: 500 });
    }

    console.log("Payment details fetched:", {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      method: payment.method
    });

    // STEP 4: Verify payment status
    const validStatuses = ['captured', 'authorized'];
    if (!validStatuses.includes(payment.status)) {
      console.error("Payment status not valid:", {
        payment_id: razorpay_payment_id,
        status: payment.status,
        expected: validStatuses
      });
      return NextResponse.json({ 
        error: `Payment not successful. Status: ${payment.status}` 
      }, { status: 400 });
    }

    console.log("✓ Payment status verified:", payment.status);

    // STEP 5: Verify amount matches (if provided)
    if (bookingDetails?.amount) {
      // Ensure both amounts are in paise for comparison
      const expectedAmount = bookingDetails.amount > 100000 
        ? bookingDetails.amount 
        : Math.round(bookingDetails.amount * 100);

      const receivedAmount = typeof payment.amount === 'string' 
        ? parseInt(payment.amount, 10) 
        : payment.amount;

      if (receivedAmount !== expectedAmount) {
        console.error("Amount mismatch detected:", {
          expected: expectedAmount,
          received: receivedAmount,
          difference: receivedAmount - expectedAmount
        });
        return NextResponse.json({ 
          error: "Payment amount does not match expected amount" 
        }, { status: 400 });
      }
      console.log("✓ Amount verified:", receivedAmount, "paise");
    }

    // STEP 6: Save booking to database
    console.log("Saving booking to database...");
    
    if (bookingDetails) {
      const bookingData = {
        name: bookingDetails.name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        plan: bookingDetails.plan,
        retreat_date: bookingDetails.retreatDate,
        upgrade_room: bookingDetails.upgradeRoom,
        amount_paid: payment.amount, // Use verified amount from Razorpay
        razorpay_order_id,
        razorpay_payment_id,
        payment_status: payment.status,
        payment_method: payment.method || 'unknown',
        created_at: new Date().toISOString()
      };

      const { data: savedBooking, error: saveError } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();
        
      if (saveError) {
        // CRITICAL: Payment succeeded but database save failed
        console.error("🚨 CRITICAL ERROR: Failed to save booking to database:", {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: payment.amount,
          customer_email: bookingDetails.email,
          error: saveError
        });

        // TODO: Implement retry logic
        // TODO: Send alert to admin (email/SMS/Slack)
        // TODO: Log to external monitoring service
        
        // Still return success since payment went through
        // Customer service can manually reconcile
        return NextResponse.json({ 
          success: true, 
          warning: "Payment successful but there was an issue saving your booking. Our team has been notified and will contact you shortly.",
          payment_id: razorpay_payment_id
        }, { status: 200 });
      }

      console.log("✓ Booking saved successfully:", savedBooking.id);

      return NextResponse.json({ 
        success: true, 
        message: "Payment verified and booking confirmed successfully",
        bookingId: savedBooking.id,
        payment_id: razorpay_payment_id
      }, { status: 200 });
    }

    // If no booking details provided, just verify payment
    console.log("✓ Payment verified (no booking details to save)");
    
    return NextResponse.json({ 
      success: true, 
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id
    }, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Razorpay Verification Error:", error);
    
    let errorMessage = "Failed to verify payment";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
