"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {CreateCardSchema} from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title, listId, boardId} = data;


    let card;

    try {
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId,
                },
            }
        });

        if(!list) return {
            error: "List not found",
        }

        const lastCardOrder = await db.card.findFirst({
            where: {
                listId,
            },
            orderBy: {
                order: "desc",
            },
            select: {
                order: true,
            }
        });

        const order = lastCardOrder ? lastCardOrder.order + 1 : 1;

        card = await db.card.create({
            data: {
                title,
                listId,
                order,
            }
        });

    } catch (error: any) {
        return {
            error: "Failed to create card: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: card,
    }
}

const createCard = createSafeAction(CreateCardSchema, handler);

export default createCard;