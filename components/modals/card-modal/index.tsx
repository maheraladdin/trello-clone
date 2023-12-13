"use client";


import {CardWithList} from "@/types";
import {fetcher} from "@/lib/fetcher";
import {AuditLog} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import useCardModel from "@/hooks/use-card-model";
import {Dialog, DialogContent} from "@/components/ui/dialog";


import {Header} from "./header";
import {Description} from "./description";
import {Actions} from "@/components/modals/card-modal/actions";
import {Activity} from "@/components/modals/card-modal/activity";

export default function CardModal() {
    const id = useCardModel(state => state.id);
    const isOpen = useCardModel(state => state.isOpen);
    const onClose = useCardModel(state => state.onClose);

    const {data: cardData} = useQuery<CardWithList>({
            queryKey: ["card", id],
            queryFn: () => fetcher(`/api/v1/cards/${id}`),
            enabled: isOpen,
    });

    const {data: auditLogsData} = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/v1/cards/${id}/logs`),
        enabled: isOpen,
    });


    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {cardData ? <Header data={cardData}/> : <Header.Skeleton />}
                <div className={"grid grid-cols-1 md:grid-cols-4 md:gap-4"}>
                    <div className={"col-span-3"}>
                        <div className={"w-full space-y-6"}>
                            {cardData ? <Description data={cardData}/> : <Description.Skeleton />}
                            {auditLogsData ? <Activity items={auditLogsData} /> : <Activity.Skeleton />}
                        </div>
                    </div>
                    {cardData ? <Actions data={cardData}/> : <Actions.Skeleton />}
                </div>
            </DialogContent>
        </Dialog>
    );
};