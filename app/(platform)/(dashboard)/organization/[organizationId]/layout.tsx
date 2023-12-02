import {startCase} from "lodash";
import OrgControl from "./_components/org-control";
import {auth} from "@clerk/nextjs";

export async function generateMetadata() {
    const {orgSlug} = auth();
    return {
        title: startCase(orgSlug || "organization"),
        description: "Manage your organization",
    }
}

export default function OrganizationIdLayout({ children }: { children: React.ReactNode }) {

        return (
            <>
                <OrgControl />
                {children}
            </>
        )
}