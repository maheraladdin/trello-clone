"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {UpdateListSchema} from "./schema";


const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title, id, boardId} = data;

    let list;

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
            data: {
                title,
            }
        });
    } catch (error: any) {
        return {
            error: "Failed to update board: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {
        data: list,
    }
}

const updateList = createSafeAction(UpdateListSchema, handler);

export default updateList;