"use server";

import {auth, currentUser} from "@clerk/nextjs";
import {revalidatePath} from "next/cache";

import {db} from "@/lib/db";
import {OutputType} from "./types";
import {StripeRedirectSchema} from "./schema";
import createSafeAction from "@/lib/create-safe-action";
import {absoluteURL} from "@/lib/utils";
import {stripe} from "@/lib/stripe";


/**
 * @desc    Copy a card in the same list at the bottom
 */
const handler = async (): Promise<OutputType> => {
    const { userId, orgId } = auth();
    const user = await currentUser();

    if(!userId || !orgId || !user) {
        return {
            error: "Not authenticated",
        }
    }

    const settingsURL = absoluteURL(`/organization/${orgId}`);

    let url="";

    try {
        const orgSubscription = await db.orgSubscription.findUnique({
            where: {
                orgId,
            },
        });

        if(orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingsURL,
            });

            url = stripeSession.url;
        } else {
            const stripeSession = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "subscription",
                success_url: settingsURL,
                cancel_url: settingsURL,
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Taskify Pro",
                                description: "unlimited boards for your organization"
                            },
                            unit_amount: 2000,  // $20.00
                            recurring: {
                                interval: "month",
                            },
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    orgId,
                },
            });

            url = stripeSession.url || "";
        }


    } catch {
        return {
            error: "Something went wrong",
        }
    }

    revalidatePath(`/organization/${orgId}`);
    return {data: url};
}

const stripeRedirect = createSafeAction(StripeRedirectSchema, handler);

export default stripeRedirect;