"use client";

import {ListWithCards} from "@/types";
import ListWrapper from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper";
import ListHeader from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-header";
import {ElementRef, useRef, useState} from "react";
import CardForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/card-form";

export default function ListItem({ list, index }: { list: ListWithCards, index: number }) {
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    
    const [isEditing, setIsEditing] = useState(false);

    const disableEditing = () => setIsEditing(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    }

    return (
        <ListWrapper>
            <div className={"w-full rounded-md bg-[#F1F2F4] shadow-md pb-2"}>
                <ListHeader
                    onAddCard={enableEditing}
                    list={list}
                />
                <CardForm
                    listId={list.id}
                    boardId={list.boardId}
                    ref={textareaRef}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                />
            </div>
        </ListWrapper>
    );
};