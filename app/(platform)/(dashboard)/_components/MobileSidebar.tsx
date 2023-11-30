"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import useMobileSidebar from "@/hooks/use-mobile-sidebar";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {Sidebar} from "@/app/(platform)/(dashboard)/_components";

export default function MobileSidebar() {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar(state => state.onOpen);
    const onClose = useMobileSidebar(state => state.onClose);
    const isOpen = useMobileSidebar(state => state.isOpen);

    // do not render on server side to avoid mismatched state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <Button
                onClick={onOpen}
                className={"block md:hidden mr-2"}
                variant={"ghost"}
                size={"sm"}
            >
                <Menu className={"h-4 w-4"} />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side={"left"}
                    className={"p-2 pt-10"}
                >
                    <Sidebar
                        storageKey={"mobile-sidebar"}
                    />
                </SheetContent>
            </Sheet>
        </>
    );
}