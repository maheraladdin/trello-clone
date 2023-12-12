"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {UpdateCardSchema} from "./schema";


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