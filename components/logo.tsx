import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import {cn} from "@/lib/utils";

const headerFont = localFont({
    src: "../public/fonts/font.woff2",
});

export default function Logo() {
    return (
        <Link href={"/"}>
            <div className={"hover:opacity-75 transition items-center gap-x-2 hidden md:flex"}>
                <Image
                    src={"./logo.svg"}
                    alt={"Taskify"}
                    width={30}
                    height={30}
                    role={"button"}
                />
                <p className={cn(
                    "text-lg text-neutral-700 pb-1",
                    headerFont.className
                )}>
                    Taskify
                </p>
            </div>
        </Link>
    )
 }