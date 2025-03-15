import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/actions/payment-help";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!);

export async function POST(req: NextRequest) {

    const payload = await req.text();

    const sig = req.headers.get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload, 
            sig!, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        switch (event.type) {
            case "payment_intent.succeeded": {
                const session = await stripe.checkout.sessions.retrieve(event.data.object.id, 
                    {
                        expand: ['line_items'],
                    }
                );

                break;
            };
            case "checkout.session.completed": {
                const session = await stripe.checkout.sessions.retrieve(event.data.object.id, 
                    {
                        expand: ['line_items'],
                    }
                );

                await handleCheckoutSessionCompleted({ session, stripe })
                break;
            }
            case "customer.subscription.deleted":
            
                const subscriptionId = event.data.object.id

                await handleSubscriptionDeleted({subscriptionId, stripe});
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        
    } catch (err) {
        return NextResponse.json({
            status: "Failed", err
        })
    }



    return NextResponse.json({
        status: "success",
    })
};