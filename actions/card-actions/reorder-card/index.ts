"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {ReorderCardSchema} from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {items, boardId} = data;

    let reorderedCards;

    try {
        // build a transaction to update all cards order
        const transaction = items.map((card) =>
            db.card.update({
                    where: {
                        id: card.id,
                        list: {
                            boardId,
                            board: {
                                orgId,
                            }
                        }
                    },
                    data: {
                        order: card.order,
                        listId: card.listId,
                    },
                }
            )
        );

        // run the transaction
        reorderedCards = await db.$transaction(transaction);

    } catch (error: any) {
        return {
            error: "Failed to reorder list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: reorderedCards,
    }
}

const reorderCard = createSafeAction(ReorderCardSchema, handler);

export default reorderCard;