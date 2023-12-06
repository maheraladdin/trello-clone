"use client";
import {Plus} from "lucide-react";
import {useState, useRef, ElementRef} from "react";
import {useEventListener, useOnClickOutside} from "usehooks-ts";

import ListWrapper from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper";
import FormInput from "@/components/form/form-input";
import {useParams} from "next/navigation";

export default function ListForm() {
    const params = useParams();

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };
    const disableEditing = () => setIsEditing(false);

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if(isEditing) return (
        <ListWrapper>
            <form
                ref={formRef}
                className={"w-full rounded-md bg-white p-3 space-y-4 shadow-md"}
            >
                <FormInput
                    ref={inputRef}
                    id={"title"}
                    placeholder={"Enter list title..."}
                    className={"text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"}
                />
                <input
                    type="hidden"
                    value={params.boardId}
                />
            </form>
        </ListWrapper>
    )

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className={"w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"}
            >
                <Plus className={"h-4 w-4 mr-2"} />
                Add a list
            </button>
        </ListWrapper>
    )
}