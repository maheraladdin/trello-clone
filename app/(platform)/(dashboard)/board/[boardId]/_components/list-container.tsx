"use client";
import {ListWithCards} from "@/types";
import ListForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-form";
import {useEffect, useState} from "react";
import ListItem from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-item";

type ListContainerProps = {
    boardId: string,
    lists: ListWithCards[],
}

export default function ListContainer({ boardId, lists }: ListContainerProps) {
    // for optimistic updates purposes
    const [orderedLists, setOrderedLists] = useState(lists);

    useEffect(() => {
        setOrderedLists(lists);
    }, [lists]);


    return (
        <ol className={"flex gap-x-3 h-full"}>
            {
                orderedLists.map((list, index) => (
                    <ListItem
                        key={list.id}
                        index={index}
                        list={list}
                    />
                ))
            }
            <ListForm />
            <div className={"flex-shrink-0 w-1"} /> {/* a little padding at bottom of the container */}
        </ol>
    )
}