"use server";

import {CreateBoardInput, CreateBoardOutput} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {CreateBoardSchema} from "@/actions/create-board/schema";

const handler = async (data: CreateBoardInput): Promise<CreateBoardOutput> => {
    const { userId } = auth();

    if(!userId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title} = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
            }
        });
    } catch (error: any) {
        return {
            error: "Failed to create board",
        }
    }

    revalidatePath(`/board/${board.id}`);

    return {
        data: board,
    }
}

export const createBoard = createSafeAction(CreateBoardSchema, handler);