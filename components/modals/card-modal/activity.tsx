import {Skeleton} from "@/components/ui/skeleton";
import {AuditLog} from "@prisma/client";

type ActivityProps = {
    items: AuditLog[];
}

export function Activity({items}: ActivityProps) {
    return (
        <div>
            Activity
        </div>
    );
}

Activity.Skeleton = () => {
    return (
        <div className={"flex items-start gap-x-3 w-full"}>
            <Skeleton className={"h-6 w-6 bg-neutral-200"} />
            <div className="w-full flex flex-col gap-y-2">
                <Skeleton className={"h-6 w-24 bg-neutral-200"} />
                <Skeleton className={"h-10 w-full bg-neutral-200"} />
            </div>
        </div>
    );
}