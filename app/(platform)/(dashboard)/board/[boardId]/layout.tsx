import {auth} from "@clerk/nextjs";
import {notFound, redirect} from "next/navigation";
import {startCase} from "lodash";

import {db} from "@/lib/db";
import BoardNavbar from "./_components/board-navbar";


type BoardIdLayoutProps = {
    children: React.ReactNode,
    params: { boardId: string }
}

export async function generateMetadata({params}: {params: {boardId: string}}) {
    const boardTitle = await db.board.findUnique({
        where: {id: params.boardId},
        select: {title: true}
    });
    return {
        title: startCase(boardTitle?.title || "organization"),
        description: "Manage your organization",
    }
}

export default async function BoardIdLayout({
  children,
  params
}: BoardIdLayoutProps) {

    const {orgId} = auth();

    if(!orgId) redirect("/select-org");

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    });

    if(!board) notFound();

    return (
        <div
            className={"relative h-full bg-no-repeat bg-cover bg-center bg-gray-100"}
            style={{backgroundImage: `url(${board.imageFullUrl})`}}
        >
            <BoardNavbar board={board} />
            <div
                className={"absolute top-0 left-0 w-full h-full bg-black/20"}
            />
            <main className={"relative pt-28 h-full"}>
                {children}
            </main>
        </div>
    )
}