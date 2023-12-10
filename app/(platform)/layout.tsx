import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";
import ModalProvider from "@/components/provider/modal-provider";

export default function PlatformLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <Toaster />
            <ModalProvider />
            {children}
        </ClerkProvider>
    )
}