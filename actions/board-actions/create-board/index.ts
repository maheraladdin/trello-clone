"use server";

import {InputType, OutputType} from "./types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import {CreateBoardSchema} from "@/actions/board-actions/create-board/schema";
import createAuditLog from "@/lib/create-audit-log";
import {Action, EntityType} from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: "Not authenticated",
        }
    }

    const {title, image} = data;

    // order of the split is important
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageAltDescription,
        imageLinkHtml,
        imageUserName
    ] = image.split("|");


    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageAltDescription || !imageLinkHtml || !imageUserName) {
        return {
            error: "Missing Field failed to create board",
        }
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageAltDescription,
                imageLinkHtml,
                imageUserName,
            }
        });

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: EntityType.BOARD,
            action: Action.CREATE,
        });

    } catch (error: any) {
        return {
            error: "Failed to create board: " + error.message,
        }
    }

    revalidatePath(`/board/${board.id}`);

    return {
        data: board,
    }
}

const createBoard = createSafeAction(CreateBoardSchema, handler);

export default createBoard;