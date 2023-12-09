"use client";

import {useEffect, useState} from "react";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

import {ListWithCards} from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";
import useAction from "@/hooks/use-action";
import {reorderList} from "@/actions/list-actions";
import {reorderCard} from "@/actions/card-actions";

type ListContainerProps = {
    boardId: string,
    lists: ListWithCards[],
}

/**
 * Moves an item from position in list to another position in the same list.
 * @param list the list of items
 * @param startIndex the index of the item to move
 * @param endIndex the index of the item to replace
 */
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    // create a copy of the list
    const result = Array.from(list);
    // remove the item from the list
    const [removed] = result.splice(startIndex, 1);
    // insert the item at the new position
    result.splice(endIndex, 0, removed);
    // return the new list with the item moved
    return result;
}

export default function ListContainer({ boardId, lists }: ListContainerProps) {
    // for optimistic updates purposes
    const [orderedLists, setOrderedLists] = useState(lists);

    const {execute: executeReorderList} = useAction(reorderList, {
        enableToast: true,
        toastLoadingMessage: "Reordering lists...",
        toastSuccessMessage: "Lists reordered successfully.",
        toastErrorMessage: "Failed to reorder lists: "
    });

    const {execute: executeReorderCard} = useAction(reorderCard, {
        enableToast: true,
        toastLoadingMessage: "Reordering cards...",
        toastSuccessMessage: "Cards reordered successfully.",
        toastErrorMessage: "Failed to reorder cards: "
    });

    useEffect(() => {
        setOrderedLists(lists);
    }, [lists]);

    const onDragEnd = async (result: any) => {
        const { source, destination, type } = result;

        if(!destination) return;

        // if the item was dropped in the same position, do nothing
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;

        // user move a list
        if(type === "list") {
            const items = reorder(orderedLists, source.index, destination.index).map((list, index) => ({ ...list, order: index + 1 }));
            setOrderedLists(items);
            console.log(JSON.stringify({...items, boardId}, null, 2));
            await executeReorderList({boardId, items});

            return;
        }

        // user move a card
        if(type === "card") {
            let newOrderedLists = [...orderedLists];

            // get source and destination lists
            const sourceList = newOrderedLists.find(list => list.id === source.droppableId);
            const destinationList = newOrderedLists.find(list => list.id === destination.droppableId);


            if(!sourceList || !destinationList) return;

            // check if the Cards exist in the source list
            if(!sourceList.Cards) {
                sourceList.Cards = [];
            }

            // check if the Cards exist in the destination list
            if(!destinationList.Cards) {
                destinationList.Cards = [];
            }

            // moving a card in the same list
            if(source.droppableId === destination.droppableId) {
                const newOrderedCards = reorder(sourceList.Cards, source.index, destination.index).map((card, index) => ({ ...card, order: index + 1 }));

                sourceList.Cards = newOrderedCards;

                setOrderedLists(newOrderedLists);

                await executeReorderCard({
                    boardId,
                    items: newOrderedCards
                });

                return;
            }

            // moving a card to another list
            if(source.droppableId !== destination.droppableId) {
                // remove the card from the source list
                const [removed] = sourceList.Cards.splice(source.index, 1);

                // assign the new listId to the removed card
                removed.listId = destination.droppableId;

                // insert the card in the destination list
                destinationList.Cards.splice(destination.index, 0, removed);

                // update the order of the cards in the source list
                sourceList.Cards = sourceList.Cards.map((card, index) => ({...card, order: index + 1}));

                // update the order of the cards in the destination list
                destinationList.Cards = destinationList.Cards.map((card, index) => ({...card, order: index + 1}));

                setOrderedLists(newOrderedLists);

                await executeReorderCard({
                    boardId,
                    items: destinationList.Cards
                });

                return;
            }

        }

    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"lists"} type={"list"} direction={"horizontal"}>
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={"flex gap-x-3 h-full"}
                    >
                        {
                            orderedLists.map((list, index) => (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    list={list}
                                />
                            ))
                        }
                        {provided.placeholder}
                        <ListForm />
                        <div className={"flex-shrink-0 w-1"} /> {/* a little padding at bottom of the container */}
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}