"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import {CreditCard} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Info() {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <Info.Skeleton />
    }

    return (
        <div
            className={"flex items-center gap-x-4"}
        >
            <div
                className={"w-[60px] h-[60px] relative"}
            >
                <Image
                    src={organization?.imageUrl!}
                    alt={organization?.name!}
                    fill
                    objectFit={"cover"}
                    className={"rounded-md"}
                />
            </div>
            <div
                className={"flex flex-col gap-y-1"}
            >
                <p
                    className={"text-xl font-semibold"}
                >
                    {organization?.name}
                </p>
                <div
                    className={"flex items-center text-xs text-muted-foreground"}
                >
                    <CreditCard className={"h-3 w-3 mr-1"} />
                    Free
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className={"flex items-center gap-x-4"}>
            <div className={"w-[60px] h-[60px] relative"}>
                <Skeleton className={"w-full h-full absolute"} />
            </div>
            <div
                className={"flex flex-col gap-y-1"}
            >
                <Skeleton className={"w-[200px] h-10"} />
                <div className={"flex items-center"}>
                    <Skeleton className={"h-4 w-4 mr-2"} />
                    <Skeleton className={"w-[100px] h-4"} />
                </div>
            </div>
        </div>
    )
}