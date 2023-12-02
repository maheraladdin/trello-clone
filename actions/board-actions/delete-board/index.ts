"use server";

import {DeleteBoardInput, DeleteBoardOutput} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {DeleteBoardSchema} from "@/actions/board-actions/delete-board/schema";
import {redirect} from "next/navigation";


const handler = async (data: DeleteBoardInput): Promise<DeleteBoardOutput> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {id} = data;
    try {
        await db.board.delete({
            where: {
                id,
                orgId,          // Only allow updating boards that belong to the current user's org
            }
        });
    } catch (error: any) {
        return {
            error: "Failed to delete board: " + error.message,
        }
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);

}

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);