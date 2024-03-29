import {Button} from "@/components/ui/button";
import Logo from "@/components/logo";

export default function Footer() {
    return (
        <nav className={"fixed bottom-0 w-full p-4 border-t bg-slate-100 dark:bg-slate-900"}>
            <div className={"max-w-screen-2xl mx-auto flex items-center w-full justify-between"}>
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"ghost"} >
                        Privacy Policy
                    </Button>
                    <Button size={"sm"} variant={"ghost"} >
                        Terms of Service
                    </Button>
                </div>
            </div>
        </nav>
    )
}