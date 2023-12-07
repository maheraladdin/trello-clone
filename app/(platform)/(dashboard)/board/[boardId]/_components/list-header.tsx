"use client";
import {useState, useRef, ElementRef} from "react";
import {List} from "@prisma/client";
import {useEventListener} from "usehooks-ts";
import FormInput from "@/components/form/form-input";
import useAction from "@/hooks/use-action";
import {updateList} from "@/actions/list-actions";
import ListOptions from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-options";

type ListHeaderProps = {
    list: List,
    onAddCard: () => void,
}

export default function ListHeader({list, onAddCard}: ListHeaderProps) {

    const [title, setTitle] = useState(list.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };

    const disableEditing = () => setIsEditing(false);

    const {execute, fieldErrors} = useAction(updateList, {
        enableToast: true,
        toastLoadingMessage: "Updating list...",
        toastSuccessMessage: "List updated!",
        toastErrorMessage: "Failed to update list: ",
        onSuccess: (data) => {
            setTitle(data.title)
            disableEditing();
        }
    });

    const onSubmit = async (formData: FormData) => {
        const newTitle = formData.get("title") as string;
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        if(!newTitle || title === newTitle) return disableEditing();

        await execute({id, boardId, title: newTitle});
    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    }

    useEventListener("keydown", onKeyDown);

    return (
        <div className={"pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2"}>
            {isEditing ? (
                <form
                    ref={formRef}
                    className={"flex-1 px-[2px]"}
                    action={onSubmit}
                >
                    <input type="hidden" name={"id"} value={list.id} />
                    <input type="hidden" name={"boardId"} value={list.boardId} />
                    <FormInput
                        ref={inputRef}
                        id={"title"}
                        placeholder={"Enter list title..."}
                        defaultValue={title}
                        onBlur={onBlur}
                        errors={fieldErrors}
                        className={"text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"}
                    />
                    <button type={"submit"} hidden />
                </form>
            ):(
                <button
                    className={"w-full text-sm px-2.5 py-1 h-7 font-medium text-start"}
                    onClick={enableEditing}
                >
                    {title}
                </button>
            )}
            <ListOptions list={list} onAddCard={() => {}} />
        </div>
    )
}