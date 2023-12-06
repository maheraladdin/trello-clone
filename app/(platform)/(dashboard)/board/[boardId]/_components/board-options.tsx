"use client"
import {Button} from "@/components/ui/button";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Loader2, MoreHorizontalIcon, XIcon} from "lucide-react";
import useAction from "@/hooks/use-action";
import {deleteBoard} from "@/actions/board-actions";

export default function BoardOptions({id}: {id: string}) {

    const { execute, isLoading } = useAction(deleteBoard);

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button
                        className={"h-auto w-auto p-2"}
                        variant={"transparent"}
                    >
                    <MoreHorizontalIcon className="w-6 h-6" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={"px-0 py-3 "}
                    side={"bottom"}
                    align={"start"}
                >
                    <div className={"text-sm font-medium text-center text-neutral-600 pb-4"}>
                        Board Actions
                    </div>
                    <PopoverClose asChild>
                        <Button
                            className={"h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"}
                            variant={"ghost"}
                        >
                            <XIcon className={"w-4 h-4"} />
                        </Button>
                    </PopoverClose>
                    <Button
                        variant={"ghost"}
                        onClick={() => execute({id})}
                        className={"w-full rounded-none h-auto py-2 px-5 justify-start font-normal text-sm"}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className={"w-4 h-4 mr-2 animate-spin"} />}
                        Delete this Board
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}