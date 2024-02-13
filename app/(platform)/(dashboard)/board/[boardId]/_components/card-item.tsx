import {Card} from "@prisma/client";
import {Draggable} from "@hello-pangea/dnd";
import useCardModel from "@/hooks/use-card-model";

type CardItemProps = {
    card: Card;
    index: number;
}

export default function CardItem({card, index}: CardItemProps) {

    const onOpen = useCardModel(state => state.onOpen);

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => onOpen(card.id)}
                    className={"truncate border-2 border-transparent hover:border-black dark:hover:border-slate-700 py-2 px-3 text-sm bg-white dark:bg-slate-900 rounded-md shadow-sm"}
                >
                    {card.title}
                </div>
            )}
        </Draggable>
    )
}