"use client";

import Image from "next/image";
import useProModel from "@/hooks/use-pro-model";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import useAction from "@/hooks/use-action";
import stripeRedirect from "@/actions/stripe-redirect";

export default function ProModel() {
    const proModel = useProModel();

    const {execute, isLoading} = useAction(stripeRedirect, {
        enableToast: true,
        toastLoadingMessage: "Redirecting to Stripe...",
        toastSuccessMessage: "Redirecting to Stripe...",
        toastErrorMessage: "Failed to redirect to Stripe.",
        onSuccess: (url) => {
            window.location.href = url;
        },
    });

    const onClick = async () => {
        await execute({});
    }

    return (
        <Dialog
            onOpenChange={proModel.onClose}
            open={proModel.isOpen}
        >
            <DialogContent
                className={"max-w-md p-0 overflow-hidden"}
            >
                <div className={"aspect-video relative flex items-center justify-center"}>
                    <Image
                        src={"/hero.svg"}
                        alt={"Hero"}
                        fill
                        objectFit={"cover"}
                    />
                </div>
                <div className={"text-neutral-700 mx-auto space-y-6 p-6"}>
                    <h2 className={"font-semibold text-xl"}>
                        Upgrade to Taskify Pro Today!
                    </h2>
                    <p className={"text-xs font-semibold text-neutral-600"}>
                        Explore the best of Taskify!
                    </p>
                    <div className={"pl-3"}>
                        <ul className={"text-sm list-disc"}>
                            <li>
                                Unlimited Boards
                            </li>
                            <li>
                                Advanced checklist
                            </li>
                            <li>
                                Admin & Security features
                            </li>
                            <li>
                                And more...
                            </li>
                        </ul>
                    </div>
                    <Button
                        className={"w-full"}
                        variant={"primary"}
                        onClick={onClick}
                        disabled={isLoading}
                    >
                        Upgrade to Pro
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}