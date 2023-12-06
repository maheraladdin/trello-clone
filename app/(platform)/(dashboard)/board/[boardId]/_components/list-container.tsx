"use client";
import {ListWithCards} from "@/types";
import ListForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-form";

type ListContainerProps = {
    boardId: string,
    lists: ListWithCards[],
}

export default function ListContainer({ boardId, lists }: ListContainerProps) {
    return (
        <ol>
            <ListForm />
            <div className={"flex-shrink-0 w-1"} /> {/* a little padding at bottom of the container */}
        </ol>
    )
}