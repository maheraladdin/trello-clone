import ClerkProvider from "@/components/provider/custom-clerk-provider";
import {Toaster} from "sonner";
import ModalProvider from "@/components/provider/modal-provider";
import QueryProvider from "@/components/provider/query-provider";

export default function PlatformLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}