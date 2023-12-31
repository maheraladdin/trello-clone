import {Board} from "@prisma/client";
import BoardTitleForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/board-title-form";
import BoardOptions from "@/app/(platform)/(dashboard)/board/[boardId]/_components/board-options";


type BoardNavbarProps = {
    board: Board
}

export default function BoardNavbar({board}: BoardNavbarProps) {
    return (
        <div className={"w-full h-14 z-40 bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white justify-between"}>
            <BoardTitleForm board={board} />
            <BoardOptions id={board.id} />
        </div>
    )
}