"use client";

import ProModel from "@/components/modals/pro-model";
import CardModal from "@/components/modals/card-modal";
import {useIsClient} from "usehooks-ts";

export default function ModalProvider() {
    const isClient = useIsClient();

    return isClient ? (
        <>
            <CardModal />
            <ProModel />
        </>
    ) : null;
}