"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {CreateListSchema} from "@/actions/list-actions/create-list/schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title, boardId} = data;

    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            }
        });

        if(!board) return {
            error: "Board not found",
        }

        const lastListOrder = await db.list.findFirst({
            where: {
                boardId,
            },
            orderBy: {
                order: "desc",
            },
            select: {
                order: true,
            }
        });

        const order = lastListOrder ? lastListOrder.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order,
            }
        });
    } catch (error: any) {
        return {
            error: "Failed to create list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: list,
    }
}

const createList = createSafeAction(CreateListSchema, handler);

export default createList;