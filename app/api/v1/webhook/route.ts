import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
        return new NextResponse("webhook error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // Handle the checkout.session.completed event
    if(event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.orgId) return new NextResponse("OrgId is required", { status: 400 });

        const {orgId} = session.metadata;

        await db.orgSubscription.create({
            data: {
                orgId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id as string,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }
        });
    }

    // Handle invoice.payment_succeeded event
    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await db.orgSubscription.update({
           where: {
               stripeSubscriptionId: subscription.id,
           },
            data: {
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                stripePriceId: subscription.items.data[0].price.id as string,
            }
        });
    }

    return new NextResponse(null, { status: 200 });

}