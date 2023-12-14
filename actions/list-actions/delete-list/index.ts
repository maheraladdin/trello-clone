"use server";

import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs";

import {InputType, OutputType} from "./types";
import {db} from "@/lib/db";
import createSafeAction from "@/lib/create-safe-action";
import {DeleteListSchema} from "./schema";
import createAuditLog from "@/lib/create-audit-log";
import {Action, EntityType} from "@prisma/client";


const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {id, boardId} = data;

    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId, // Only allow updating boards that belong to the current user's org
                }
            }
        });

        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: EntityType.LIST,
            action: Action.DELETE,
        });

    } catch (error: any) {
        return {
            error: "Failed to delete list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: list,
    }
}

const deleteList = createSafeAction(DeleteListSchema, handler);

export default deleteList;