"use client";

import useAction from "@/hooks/use-action";
import {Button} from "@/components/ui/button";
import stripeRedirect from "@/actions/stripe-redirect";
import useProModel from "@/hooks/use-pro-model";

type SubscriptionButtonProps = {
    isPro: boolean;
}
export const SubscriptionButton = ({isPro}: SubscriptionButtonProps) => {

    const proModel = useProModel();

    const {execute, isLoading} = useAction(stripeRedirect, {
        enableToast: true,
        toastLoadingMessage: `Redirecting to ${isPro ? "Subscription Manager..." : "Checkout Session..."}`,
        toastSuccessMessage: `Redirecting to ${isPro ? "Subscription Manager..." : "Checkout Session..."}`,
        toastErrorMessage: `Failed to redirect to ${isPro ? "Subscription Manager" : "Checkout Session"}: `,
        onSuccess: (url) => {
            window.location.href = url;
        },
    });

    const onClick = async () => {
        isPro ? await execute({}) : proModel.onOpen();
    }

    return (
        <Button
            variant={"primary"}
            disabled={isLoading}
            onClick={onClick}
        >
            {isPro ? "Manage subscription" : "Upgrade to Pro"}
        </Button>
    )
}