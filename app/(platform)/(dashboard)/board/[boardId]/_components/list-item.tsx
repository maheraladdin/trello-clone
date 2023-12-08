"use client";

import {ElementRef, useRef, useState} from "react";
import {Draggable, Droppable} from "@hello-pangea/dnd";

import {ListWithCards} from "@/types";
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
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={"shrink-0 h-full w-[272px] select-none"}
                >
                    <div
                        {...provided.dragHandleProps}
                        className={"w-full rounded-md bg-[#F1F2F4] shadow-md pb-2"}
                    >
                        <ListHeader
                            onAddCard={enableEditing}
                            list={list}
                        />
                        <Droppable droppableId={list.id} type={"card"}>
                            {(provided) => (
                                <ol
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
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
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            listId={list.id}
                            boardId={list.boardId}
                            ref={textareaRef}
                            isEditing={isEditing}
                            enableEditing={enableEditing}
                            disableEditing={disableEditing}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};