"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {type CardWithList} from "@/types";
import {Button} from "@/components/ui/button";
import {Copy, Trash} from "lucide-react";

type ActionsProps = {
    data: CardWithList;
}

export const Actions = ({data}: ActionsProps) => {
    return (
        <div className={"space-y-2 mt-2"}>
            <p className={"text-xs font-semibold"}>
                Actions
            </p>
            <Button
                variant={"gray"}
                className={"w-full justify-start "}
                size={"inline"}
            >
                <Copy className={"w-4 h-4 mr-2"}/>
                Copy
            </Button>
            <Button
                variant={"gray"}
                className={"w-full justify-start "}
                size={"inline"}
            >
                <Trash className={"w-4 h-4 mr-2"}/>
                Delete
            </Button>
        </div>
    );
}


Actions.Skeleton = () => {
    return (
        <div className={"space-y-2 mt-2"}>
            <Skeleton className={"w-20 h-4 bg-neutral-200"} />
            <Skeleton className={"w-full h-8 bg-neutral-200"} />
            <Skeleton className={"w-full h-8 bg-neutral-200"} />
        </div>
    );
}