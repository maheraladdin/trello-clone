"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {UpdateBoardSchema} from "@/actions/board-actions/update-board/schema";
import createAuditLog from "@/lib/create-audit-log";
import {Action, EntityType} from "@prisma/client";


const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title, id} = data;

    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                orgId,          // Only allow updating boards that belong to the current user's org
            },
            data: {
                title,
            }
        });

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: EntityType.BOARD,
            action: Action.UPDATE,
        });

    } catch (error: any) {
        return {
            error: "Failed to update board: " + error.message,
        }
    }

    revalidatePath(`/board/${board.id}`);

    return {
        data: board,
    }
}

const updateBoard = createSafeAction(UpdateBoardSchema, handler);

export default updateBoard;