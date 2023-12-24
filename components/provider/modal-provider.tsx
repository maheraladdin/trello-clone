"use client";

import ProModel from "@/components/modals/pro-model";
import CardModal from "@/components/modals/card-modal";
import {useSsr} from "usehooks-ts";

export default function ModalProvider() {
    const {isBrowser} = useSsr();

    return isBrowser ? (
        <>
            <CardModal />
            <ProModel />
        </>
    ) : null;
}