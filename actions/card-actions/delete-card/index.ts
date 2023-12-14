"use server";

import {auth} from "@clerk/nextjs";
import {revalidatePath} from "next/cache";
import createAuditLog from "@/lib/create-audit-log";

import {InputType, OutputType} from "./types";
import {db} from "@/lib/db";
import {Action, EntityType} from "@prisma/client";
import createSafeAction from "@/lib/create-safe-action";
import {DeleteCardSchema} from "./schema";


/**
 * @desc    Delete a card from a list
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

        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });

        await createAuditLog({
            action: Action.DELETE,
            entityId: card.id,
            entityTitle: card.title,
            entityType: EntityType.CARD,
        });

    } catch (error: any) {
        return {
            error: "Failed to copy list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {data: card}
}

const deleteCard = createSafeAction(DeleteCardSchema, handler);

export default deleteCard;