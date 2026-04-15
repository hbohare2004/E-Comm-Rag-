import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type { CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items?: CartItem[] };

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const lineItems = body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          description: item.product.description?.slice(0, 500) || undefined,
          images: item.product.image_url ? [item.product.image_url] : undefined,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
