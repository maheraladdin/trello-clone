"use server";

import {revalidatePath} from "next/cache";
import {db} from "@/lib/db";

export default async function deleteBoard(id: string) {
    await db.board.delete({
        where: {
            id,
        }
    });

    revalidatePath("/organization/org_2YrMGcvArDd91X4qt4I0MOsUFey")
}