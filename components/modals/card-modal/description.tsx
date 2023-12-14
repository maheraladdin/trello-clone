"use client";

import {AlignLeft} from "lucide-react";
import {
    type ElementRef, KeyboardEventHandler,
    useRef,
    useState,
} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {useEventListener, useOnClickOutside} from "usehooks-ts";


import {CardWithList} from "@/types";
import useAction from "@/hooks/use-action";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {updateCard} from "@/actions/card-actions";
import FormButton from "@/components/form/form-button";
import FormTextarea from "@/components/form/form-textarea";

type DescriptionProps = {
    data: CardWithList;
}

export function Description({data}: DescriptionProps) {
    const queryClient = useQueryClient();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus();
        })
    };

    const disableEditing = () => setIsEditing(false);

    const onKeyDown = (event: KeyboardEvent) => {
        if(event.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const {execute, fieldErrors} = useAction(updateCard, {
        enableToast: true,
        toastLoadingMessage: "Updating card...",
        toastSuccessMessage: "Card updated successfully!",
        toastErrorMessage: "Failed to update card.",
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            await queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id],
            });
            disableEditing();
        }
    })

    const onSubmit = async (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;
        const id = data.id as string;

        if(!description || description === data.description) return;

        await execute({boardId, id, description});
    }

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if(event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            formRef.current?.requestSubmit();
        }
    }

    return (
        <div className={"flex items-start gap-x-3 w-full"}>
            <AlignLeft className={"h-5 w-5 mt-0.5 text-neutral-700"} />
            <div className="w-full">
                <p className={"font-semibold text-neutral-700 mb-2"}>
                    Description
                </p>
                {isEditing ? (
                    <form
                        ref={formRef}
                        action={onSubmit}
                        className={"space-y-2"}
                    >
                        <FormTextarea
                            id={"description"}
                            ref={textareaRef}
                            defaultValue={data.description as string}
                            className={"w-full mt-2"}
                            placeholder={"Add a more detailed description..."}
                            errors={fieldErrors}
                            onKeyDown={onTextareaKeyDown}
                        />
                        <div className={"flex items-center justify-start flex-row-reverse gap-x-2"}>
                            <FormButton type={"submit"}>
                                Save
                            </FormButton>
                            <Button
                                type={"button"}
                                onClick={disableEditing}
                                size={"sm"}
                                variant={"ghost"}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                    )
                    :
                    (
                        <div
                            role={"button"}
                            onClick={enableEditing}
                            className={"w-full min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md resize-none whitespace-pre"}
                        >
                            {data.description || "Add a more detailed description..."}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className={"flex items-start gap-x-3 w-full"}>
            <Skeleton className={"h-6 w-6 bg-neutral-200"}/>
            <div className={"w-full"}>
                <Skeleton className={"h-6 w-24 mb-2 bg-neutral-200"}/>
                <Skeleton className={"h-[78px] w-full bg-neutral-200"}/>
            </div>
        </div>
    )
}