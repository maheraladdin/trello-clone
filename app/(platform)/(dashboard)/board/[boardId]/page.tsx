import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import ListContainer from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-container";
import {ListWithCards} from "@/types";

type BoardIdPageProps = {
    params: {
        boardId: string,
    },
}

export default async function BoardIdPage({ params: { boardId } }: BoardIdPageProps) {
    const {orgId} = auth();
    if (!orgId) redirect("/select-org");
    let lists: ListWithCards[] = [];
    try {

         lists = await db.list.findMany({
            where: {
                boardId,
                board: {
                    orgId,
                }
            },
            include: {
                Cards: {
                    orderBy: {
                        order: "asc",
                    }
                },
            },
            orderBy: {
                order: "asc",
            }
        });
    } catch (e) {
        console.error(e);
    }

    return (
        <div className={"p-4 h-full overflow-x-auto"}>
            <ListContainer lists={lists} boardId={boardId} />
        </div>
    )

};