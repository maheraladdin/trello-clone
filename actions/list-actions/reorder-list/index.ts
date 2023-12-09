"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {ReorderListSchema} from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {boardId, items} = data;

    let lists;

    try {
        // build Query for each list
        const transaction = items.map((list) =>
            db.list.update({
                where: {
                    id: list.id,
                    boardId,
                    board: {
                        orgId, // Ensure that the user has access to the board
                    }
                },
                data: {
                    order: list.order,
                },
            })
        );
        // Execute all queries in a single transaction
        lists = await db.$transaction(transaction);

    } catch (error: any) {
        return {
            error: "Failed to reorder list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: lists,
    }
}

const reorderList = createSafeAction(ReorderListSchema, handler);

export default reorderList;