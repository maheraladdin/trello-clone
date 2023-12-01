import Info from "./_components/info";
import {Separator} from "@/components/ui/separator";


export default async function OrganizationIdPage({params}: {params: {organizationId: string}}) {

    return (
        <div className={"w-full mb-20"}>
            <Info />
            <Separator className={"my-4"} />

        </div>
    )
}