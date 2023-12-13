"use server";

import {auth} from "@clerk/nextjs";
import {revalidatePath} from "next/cache";
import {Action, EntityType} from "@prisma/client";

import {db} from "@/lib/db";
import {CreateCardSchema} from "./schema";
import {type InputType, type OutputType} from "./types";
import createAuditLog from "@/lib/create-audit-log";
import createSafeAction from "@/lib/create-safe-action";

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

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: EntityType.CARD,
            action: Action.CREATE
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