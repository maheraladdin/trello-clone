"use client";

import {useEffect, useState} from "react";

import ProModel from "@/components/modals/pro-model";
import CardModal from "@/components/modals/card-modal";

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <>
            <CardModal />
            <ProModel />
        </>
    )
}