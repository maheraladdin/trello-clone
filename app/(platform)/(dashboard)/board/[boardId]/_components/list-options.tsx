"use client";

import {List} from "@prisma/client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, XIcon} from "lucide-react";
import FormButton from "@/components/form/form-button";
import {Separator} from "@/components/ui/separator";
import useAction from "@/hooks/use-action";
import {copyList, deleteList} from "@/actions/list-actions";
import {ElementRef, useRef} from "react";


type ListOptionsProps = {
    list: List,
    onAddCard: () => void,
}

export default function ListOptions({list, onAddCard}: ListOptionsProps) {

    const closeRef = useRef<ElementRef<"button">>(null);

    const {execute: executeDelete} = useAction(deleteList, {
        enableToast: true,
        toastLoadingMessage: "Deleting list...",
        toastSuccessMessage: "List deleted!",
        toastErrorMessage: "Failed to delete list: ",
        onSuccess: () => {
            closeRef.current?.click();
        }
    });

    const {execute: executeCopy} = useAction(copyList, {
        enableToast: true,
        toastLoadingMessage: "Coping list...",
        toastSuccessMessage: "List Coped!",
        toastErrorMessage: "Failed to copy list: ",
        onSuccess: () => {
            closeRef.current?.click();
        }
    });



    const onDelete = async (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        await executeDelete({id, boardId});
    }

    const onCopy = async (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        await executeCopy({id, boardId});
    }



    return (
        <Popover>
            <PopoverTrigger asChild>
                 <Button
                     className={"h-auto w-auto p-2"}
                     variant={"ghost"}
                 >
                    <MoreHorizontal className={"h-4 w-4"} />
                 </Button>
            </PopoverTrigger>
            <PopoverContent
                className={"px-0 pt-3 pb-3"}
                side={"bottom"}
                align={"start"}
            >
                <div className={"text-sm font-medium text-center text-neutral-600 pb-4"}>
                    List Actions
                </div>
                <PopoverClose
                    ref={closeRef}
                    asChild
                >
                    <Button
                        className={"h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"}
                        variant={"ghost"}
                    >
                        <XIcon className={"h-4 w-4"} />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className={"rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"}
                    variant={"ghost"}
                >
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input type="hidden" name={"id"} id={"Copy-id"} value={list.id}/>
                    <input type="hidden" name={"boardId"} id={"Copy-boardId"} value={list.boardId} />
                    <FormButton
                        className={"rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"}
                        variant={"ghost"}
                    >
                        Copy list...
                    </FormButton>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input type="hidden" name={"id"} id={"Delete-id"} value={list.id}/>
                    <input type="hidden" name={"boardId"} id={"Delete-boardId"} value={list.boardId} />
                    <FormButton
                        className={"rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"}
                        variant={"ghost"}
                        type={"submit"}
                    >
                        Delete this list
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}