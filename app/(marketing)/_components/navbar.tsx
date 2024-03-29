import {Button} from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Navbar() {
    return (
        <nav className={"fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-slate-900 flex items-center"}>
            <div className={"max-w-screen-2xl mx-auto flex items-center w-full justify-between"}>
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button className={"dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"} size={"sm"} variant={"outline"} asChild>
                        <Link href={"/sign-in"}>
                            Log in
                        </Link>
                    </Button>
                    <Button size={"sm"} asChild>
                        <Link href={"/sign-up"}>
                            Get Taskify for free
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}