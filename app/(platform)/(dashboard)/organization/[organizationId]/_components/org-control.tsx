"use client";

import {useEffect} from "react";
import {useParams} from "next/navigation";
import {useOrganizationList} from "@clerk/nextjs";

export default function OrgControl() {
    const params = useParams();
    const { setActive } = useOrganizationList();

    useEffect(() => {
        if(!setActive) return;
        (async () => {
            await setActive({
                organization: params.organizationId as string,
            })
        })();
    }, [setActive, params.organizationId]);

    return null;
}