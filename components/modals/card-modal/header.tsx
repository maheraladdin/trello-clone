"use client";

import {Layout} from "lucide-react";
import {useState, useRef, ElementRef} from "react";
import {useParams} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

import useAction from "@/hooks/use-action";
import {CardWithList} from "@/types";
import {Skeleton} from "@/components/ui/skeleton";
import FormInput from "@/components/form/form-input";
import {updateCard} from "@/actions/card-actions";

type HeaderProps = {
    data: CardWithList;
}

export const Header = ({data}: HeaderProps) => {

    const queryClient = useQueryClient();
    const params = useParams();

    const {execute} = useAction(updateCard, {
        enableToast: true,
        toastLoadingMessage: "Updating card...",
        toastSuccessMessage: "Card updated!",
        toastErrorMessage: "Failed to update card.",
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            })
            setTitle(data.title);
        },
    })

    const [title, setTitle] = useState(data.title);

    const inputRef = useRef<ElementRef<"input">>(null);

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;
        const id = data.id as string;

        if(!title || title === data.title) return;

        console.log(title, boardId, id);

        await execute({id, title, boardId});
    }

    return (
        <div className={"flex items-start gap-x-3 mb-6 w-full"}>
            <Layout className={"h-5 w-5 mt-1 text-neutral-700"} />
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        id={"title"}
                        ref={inputRef}
                        onBlur={onBlur}
                        defaultValue={title}
                        className={"font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"}
                    />
                </form>
                <p className={"text-sm text-muted-foreground"}>
                    in list <span className={"underline"}>{data.list.title}</span>
                </p>
            </div>
        </div>
    )
}

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className={"flex items-start gap-x-3 mb-6"}>
            <Skeleton className={"h-6 w-6 mt-1 bg-neutral-200"} />
            <div>
                <Skeleton className={"h-6 w-24 mb-1 bg-neutral-200"} />
                <Skeleton className={"h-4 w-12 bg-neutral-200"} />
            </div>
        </div>
    )
}