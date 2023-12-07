"use client";
import {Plus, XIcon} from "lucide-react";
import {useState, useRef, ElementRef} from "react";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {useParams, useRouter} from "next/navigation";


import ListWrapper from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import {Button} from "@/components/ui/button";
import useAction from "@/hooks/use-action";
import {createList} from "@/actions/list-actions";

export default function ListForm() {
    const params = useParams();
    const router = useRouter();

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

    const {execute, fieldErrors} = useAction(createList,{
        enableToast: true,
        toastSuccessMessage: "List created successfully",
        toastErrorMessage: "List creation failed: ",
        toastLoadingMessage: "Creating list...",
        onSuccess: () => {
            disableEditing();
            router.refresh();
        }
    })

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;
        await execute({title, boardId});
    }

    if(isEditing) return (
        <ListWrapper>
            <form
                ref={formRef}
                className={"w-full rounded-md bg-white p-3 space-y-4 shadow-md"}
                action={onSubmit}
            >
                <FormInput
                    ref={inputRef}
                    errors={fieldErrors}
                    id={"title"}
                    placeholder={"Enter list title..."}
                    className={"text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"}
                />
                <input
                    type="hidden"
                    value={params.boardId}
                />
                <div className={"flex items-center justify-between"}>
                    <FormButton
                        type={"submit"}
                    >
                        Add list
                    </FormButton>
                    <Button
                        onClick={disableEditing}
                        size={"sm"}
                        variant={"ghost"}
                    >
                        <XIcon className={"h-5 w-5"} />
                    </Button>
                </div>
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