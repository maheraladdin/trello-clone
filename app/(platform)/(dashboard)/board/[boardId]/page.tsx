import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

type BoardIdPageProps = {
    params: {
        boardId: string,
    },
}

export default async function BoardIdPage({ params: { boardId } }: BoardIdPageProps) {
    const {orgId} = auth();
    if (!orgId) redirect("/select-org");

    const lists = await db.list.findMany({
        where: {
            boardId,
            board: {
                orgId,
            }
        },
        include: {
            Card: true,
        },
    });



    return (
        <>

        </>
    )
}