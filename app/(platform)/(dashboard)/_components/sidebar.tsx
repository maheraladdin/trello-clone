"use client";

import Link from "next/link";
import {Plus} from "lucide-react";
import {useLocalStorage} from "usehooks-ts";
import {useOrganization, useOrganizationList} from "@clerk/nextjs";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import {Accordion} from "@/components/ui/accordion";
import {NavItem} from "@/app/(platform)/(dashboard)/_components/index";

type SidebarProps = {
    storageKey?: string;
}

export default function Sidebar({storageKey = "sidebar"}: SidebarProps) {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
    const {
        organization: activeOrganization,
        isLoaded: isOrganizationLoaded,
    } = useOrganization();

    const {
        userMemberships,
        isLoaded: isOrganizationListLoaded,
    } = useOrganizationList({
        userMemberships: {
            infinite: true,
        }
    });

    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if(expanded[key]) acc.push(key);
            return acc;
        }, []);

    const onExpand = (id: string) => {
        setExpanded(currentValue => ({
            ...currentValue,
            [id]: !expanded[id],
        }))
    }

    if(!isOrganizationLoaded || !isOrganizationListLoaded || userMemberships.isLoading) {
        return (
            <>
                <div className={"flex items-center justify-between mb-2"}>
                    <Skeleton className={"h-10 w-[50%]"} />
                    <Skeleton className={"h-10 w-10"} />
                </div>
                <div className="space-y-2">
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                </div>
            </>
        )
    }

    return (
        <>
            <div className={"font-medium text-xs flex items-center mb-1"}>
                <span className={"pl-4"}>
                    Workspaces
                </span>
                <Button type={"button"} size={"icon"} variant={"ghost"} className={"ml-auto"} asChild>
                    <Link href={"/select-org"}>
                        <Plus className={"h-4 w-4"} />
                    </Link>
                </Button>
            </div>
            <Accordion type={"multiple"} defaultValue={defaultAccordionValue}>
                {userMemberships.data.map(({organization}) =>
                    <NavItem
                        key={organization.id}
                        isExpanded={expanded[organization.id]}
                        isActive={activeOrganization?.id === organization.id}
                        organization={organization}
                        onExpand={onExpand}
                    />
                )}
            </Accordion>
        </>
    )
}