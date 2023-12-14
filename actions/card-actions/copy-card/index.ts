"use server";

import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs";
import {Action, EntityType} from "@prisma/client";

import {InputType, OutputType} from "./types";
import {db} from "@/lib/db";
import createSafeAction from "@/lib/create-safe-action";
import {CopyCardSchema} from "./schema";
import createAuditLog from "@/lib/create-audit-log";


/**
 * @desc    Copy a card in the same list at the bottom
 * @param   data
 */
const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {id, boardId} = data;

    let card;

    try {

        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });

        if(!cardToCopy) {
            return {error: "Card not Found"};
        }

        const lastCardOrder = await db.card.findFirst({
            where: {listId: cardToCopy.listId},
            orderBy: { order: "desc" },
            select: {order: true},
        });

        const newOrder = lastCardOrder ? lastCardOrder.order + 1: 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                order: newOrder,
                description: cardToCopy.description || "",
                listId: cardToCopy.listId,
            }
        })

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: EntityType.CARD,
            action: Action.COPY,
        });

    } catch (error: any) {
        return {
            error: "Failed to copy list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {data: card}
}

const copyCard = createSafeAction(CopyCardSchema, handler);

export default copyCard;