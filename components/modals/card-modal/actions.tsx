"use client";

import {Copy, Trash} from "lucide-react";

import {type CardWithList} from "@/types";
import useAction from "@/hooks/use-action";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {copyCard, deleteCard} from "@/actions/card-actions";
import {useParams} from "next/navigation";
import useCardModel from "@/hooks/use-card-model";

type ActionsProps = {
    data: CardWithList;
}

export const Actions = ({data}: ActionsProps) => {
    const params = useParams();
    const onClose = useCardModel((state) => state.onClose);

    const {execute: executeCopy, isLoading: isLoadingCopy} = useAction(copyCard, {
        enableToast: true,
        toastLoadingMessage: "Copying card...",
        toastSuccessMessage: "Card copied!",
        toastErrorMessage: "Failed to copy card: ",
    });

    const {execute: executeDelete, isLoading: isLoadingDelete} = useAction(deleteCard, {
        enableToast: true,
        toastLoadingMessage: "Deleting card...",
        toastSuccessMessage: "Card deleted!",
        toastErrorMessage: "Failed to delete card: ",
    });

    const onCopy = async () => {
        const {id} = data;
        const boardId = params.boardId as string;

        await executeCopy({id, boardId});
        onClose();
    }

    const onDelete = async () => {
        const {id} = data;
        const boardId = params.boardId as string;

        await executeDelete({id, boardId});
        onClose();
    }

    return (
        <div className={"space-y-2 mt-2"}>
            <p className={"text-xs font-semibold"}>
                Actions
            </p>
            <Button
                variant={"gray"}
                className={"w-full justify-start "}
                size={"inline"}
                onClick={onCopy}
                disabled={isLoadingCopy}
            >
                <Copy className={"w-4 h-4 mr-2"}/>
                Copy
            </Button>
            <Button
                variant={"gray"}
                className={"w-full justify-start "}
                size={"inline"}
                onClick={onDelete}
                disabled={isLoadingDelete}
            >
                <Trash className={"w-4 h-4 mr-2"}/>
                Delete
            </Button>
        </div>
    );
}


Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className={"space-y-2 mt-2"}>
            <Skeleton className={"w-20 h-4 bg-neutral-200"} />
            <Skeleton className={"w-full h-8 bg-neutral-200"} />
            <Skeleton className={"w-full h-8 bg-neutral-200"} />
        </div>
    );
}