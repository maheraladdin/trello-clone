import {Plus} from "lucide-react";
import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";

import Logo from "@/components/logo";
import {Button} from "@/components/ui/button";
import MobileSidebar from "@/app/(platform)/(dashboard)/_components/MobileSidebar";
import FormPopover from "@/components/form/form-popover";

export default function Navbar() {
    return (
        <nav className={"fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center"}>
            <MobileSidebar />
            <div className={"flex items-center gap-x-4"}>
                <div className={"hidden md:flex"}>
                    <Logo />
                </div>
                <FormPopover
                    side={"bottom"}
                    align={"start"}
                    sideOffset={18}
                >
                    <Button size={"sm"} variant={"primary"} className={"rounded-sm hidden md:block h-auto py-1.5 px-2"}>
                        Create
                    </Button>
                </FormPopover>
                <FormPopover
                    side={"bottom"}
                    align={"start"}
                    sideOffset={18}
                >
                    <Button size={"sm"} variant={"primary"} className={"rounded-sm block md:hidden"}>
                        <Plus className={"h-4 w-4"} />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterSelectOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl={"/select-org"}
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }
                        }
                    }}
                />
                <UserButton
                    afterSignOutUrl={"/"}
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            }
                        }
                    }}
                />
            </div>
        </nav>
    )
}