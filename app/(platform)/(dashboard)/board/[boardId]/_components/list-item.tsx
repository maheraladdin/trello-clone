"use client";

import {ListWithCards} from "@/types";
import ListWrapper from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper";
import ListHeader from "@/app/(platform)/(dashboard)/board/[boardId]/_components/list-header";

export default function ListItem({ list, index }: { list: ListWithCards, index: number }) {
    return (
        <ListWrapper>
            <div className={"w-full rounded-md bg-[#F1F2F4] shadow-md pb-2"}>
                <ListHeader list={list} />
            </div>
        </ListWrapper>
    );
};