"use client";

import { useQuery } from "@tanstack/react-query";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import useCardModel from "@/hooks/use-card-model";
import {CardWithList} from "@/types";
import {fetcher} from "@/lib/fetcher";

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
                {cardData?.title}
            </DialogContent>
        </Dialog>
    );
};