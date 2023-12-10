"use client";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import useCardModel from "@/hooks/use-card-model";

export default function CardModal() {

    const id = useCardModel(state => state.id);
    const isOpen = useCardModel(state => state.isOpen);
    const onClose = useCardModel(state => state.onClose);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                I am a card modal
            </DialogContent>
        </Dialog>
    );
};