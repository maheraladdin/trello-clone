"use client";

import {XIcon} from "lucide-react";
import {ElementRef, useRef} from "react";


import {
    Popover,
    PopoverTrigger,
    PopoverContent, PopoverClose,
} from "@/components/ui/popover";
import useAction from "@/hooks/use-action";
import {createBoard} from "@/actions/board-actions/create-board";

import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import {Button} from "@/components/ui/button";
import FormPicker from "@/components/form/form-picker";
import { useRouter } from "next/navigation";

type FormPopoverProps = {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export default function FormPopover({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute, fieldErrors } = useAction(createBoard, {
        enableToast: true,
        toastErrorMessage: "Error creating board: ",
        toastSuccessMessage: "Board created!",
        toastLoadingMessage: "Creating board...",
        onSuccess: (data) => {
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        }
    });

    const onSubmit = async (formData: FormData) => {
        // get the title and image from the form data
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        // execute the createBoard action
        await execute({ title, image });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={"w-80 pt-3"}
            >
                <div className="text-sm font-medium text-neutral-600 pb-4 text-center">
                    Create a new board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className={"h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 hover:text-neutral-500 transition"}
                        variant={"ghost"}
                    >
                        <XIcon className={"h-4 w-4"} />
                    </Button>
                </PopoverClose>
                <form
                    action={onSubmit}
                    className={"space-y-4"}
                >
                    <div className={"space-y-4"}>
                        <FormPicker
                            id={"image"}
                            errors={fieldErrors}
                        />
                        <FormInput
                            label={"Board title"}
                            id={"title"}
                            placeholder={"New awesome task"}
                            type={"text"}
                            errors={fieldErrors}
                        />
                    </div>
                    <FormButton
                        type={"submit"}
                        className={"w-full"}
                    >
                        Create
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}

