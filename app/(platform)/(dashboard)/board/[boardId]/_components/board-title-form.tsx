"use client";

import {Board} from "@prisma/client";
import {useState, useRef, ElementRef} from "react";

import {Button} from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import useAction from "@/hooks/use-action";
import {updateBoard} from "@/actions/board-actions";

type BoardTitleFormProps = {
    board: Board
}

export default function BoardTitleForm({board}: BoardTitleFormProps) {

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { execute } = useAction(updateBoard, {
        enableToast: true,
        toastErrorMessage: "Error updating board: ",
        toastSuccessMessage: "Board Updated!",
        toastLoadingMessage: "Updating board...",
    });

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    }

    const onSubmit = async (formData: FormData) => {

        const title = formData.get("board-title") as string;

        if(!title || board.title === title) {
            formData.set("board-title", board.title);
            return disableEditing()
        }

        await execute({
            id: board.id,
            title,
        });

        disableEditing();
    }

    const disableEditing = () => setIsEditing(false);

    if(isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
                <FormInput
                    ref={inputRef}
                    id={"board-title"}
                    defaultValue={board.title}
                    className={"font-bold text-lg px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"}
                    onBlur={() => {
                        formRef.current?.requestSubmit();
                    }}
                />
            </form>
        )

    }

    return (
        <Button
            onClick={enableEditing}
            className={"font-bold text-lg h-auto w-auto px-2 py-1"}
            variant={"transparent"}
        >
            {board.title}
        </Button>
    )
}