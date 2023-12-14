"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {UpdateCardSchema} from "./schema";
import createAuditLog from "@/lib/create-audit-log";
import {Action, EntityType} from "@prisma/client";


const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {id, boardId, ...values} = data;

    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId,  // Only allow updating boards that belong to the current user's org
                    }
                },
            },
            data: values,
        });

        await createAuditLog({
            action: Action.UPDATE,
            entityId: card.id,
            entityTitle: card.title,
            entityType: EntityType.CARD,
        });

    } catch (error: any) {
        return {
            error: "Failed to update board: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: card,
    }
}

const updateCard = createSafeAction(UpdateCardSchema, handler);

export default updateCard;