"use client";

import { useQuery } from "@tanstack/react-query";

import {CardWithList} from "@/types";
import {fetcher} from "@/lib/fetcher";
import useCardModel from "@/hooks/use-card-model";
import {Dialog, DialogContent} from "@/components/ui/dialog";


import {Header} from "./header";

export default function CardModal() {
    const id = useCardModel(state => state.id);
    const isOpen = useCardModel(state => state.isOpen);
    const onClose = useCardModel(state => state.onClose);

    const {data: cardData} = useQuery<CardWithList>({
            queryKey: ["card", id],
            queryFn: () => fetcher(`/api/v1/cards/${id}`),
            enabled: isOpen,
        })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {cardData ? <Header data={cardData}/> : <Header.Skeleton />}
            </DialogContent>
        </Dialog>
    );
};