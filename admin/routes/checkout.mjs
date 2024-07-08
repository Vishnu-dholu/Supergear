import { Router } from "express";
import Stripe from "stripe";
const router = Router();

// Load environment variables
require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key not found in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
});

router.post("/checkout", async (req, res) => {
  try {
    const { items, email } = req.body;

    console.log("Received items:", items);
    console.log("Received email:", email);

    if (!items || !email) {
      throw new Error("Items or email missing from request body");
    }

    const extractingItems = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url:
        "https://supergear-eta.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://supergear-eta.vercel.app/cancel",
      metadata: {
        email,
      },
    });

    res.json({
      message: "Server is connected",
      success: true,
      id: session.id,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
