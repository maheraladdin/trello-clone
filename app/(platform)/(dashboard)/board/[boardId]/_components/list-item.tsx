"use client";

import {ElementRef, useRef, useState} from "react";

import {ListWithCards} from "@/types";
import ListWrapper from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper";
import ListHeader from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-header";
import CardForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/card-form";
import {cn} from "@/lib/utils";
import CardItem from "@/app/(platform)/(dashboard)/board/[boardId]/_components/card-item";

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
                <ol
                    className={cn(
                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                        list.Cards.length === 0 && "mt-2",
                        )}
                >
                    {list.Cards.map((card, index) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            index={index}
                        />
                    ))}
                </ol>
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