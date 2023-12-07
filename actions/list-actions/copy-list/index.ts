"use server";

import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs";

import {InputType, OutputType} from "./types";
import {db} from "@/lib/db";
import createSafeAction from "@/lib/create-safe-action";
import {CopyListSchema} from "./schema";


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

        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            include: {
                Cards: true
            },
        });

        if(!listToCopy) {
            return {error: "List not Found"};
        }

        const lastListOrder = await db.list.findFirst({
            where: {boardId},
            orderBy: { order: "desc" },
            select: {order: true},
        });

        const newOrder = lastListOrder ? lastListOrder.order + 1: 1;

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                Cards: {
                    createMany: {
                        data: listToCopy.Cards.map(card => ({
                            title: card.title,
                            description: card.description,
                            order: card.order,
                        }))
                    },
                },
            },
            include: {
                Cards: true,
            }
        })

    } catch (error: any) {
        return {
            error: "Failed to copy list: " + error.message,
        }
    }

    revalidatePath(`/board/${boardId}`);

    return {data: list}
}

const copyList = createSafeAction(CopyListSchema, handler);

export default copyList;