"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {DeleteBoardSchema} from "@/actions/board-actions/delete-board/schema";
import {redirect} from "next/navigation";
import createAuditLog from "@/lib/create-audit-log";
import {Action, EntityType} from "@prisma/client";
import {decrementNumberOfCreatedBoards} from "@/lib/org-limit";
import {checkSubscription} from "@/lib/subscription";


const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const isPro = await checkSubscription();

    const {id} = data;

    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,          // Only allow updating boards that belong to the current user's org
            }
        });

        !isPro && await decrementNumberOfCreatedBoards();

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: EntityType.BOARD,
            action: Action.DELETE,
        });

    } catch (error: any) {
        return {
            error: "Failed to delete board: " + error.message,
        }
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);

}

const deleteBoard = createSafeAction(DeleteBoardSchema, handler);

export default deleteBoard;