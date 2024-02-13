import {Skeleton} from "@/components/ui/skeleton";
import {AuditLog} from "@prisma/client";
import {ActivityIcon} from "lucide-react";
import {ActivityItem} from "@/components/activity-item";

type ActivityProps = {
    items: AuditLog[];
}

export function Activity({items}: ActivityProps) {
    return (
        <div className={"flex items-start gap-x-3 w-full"}>
            <ActivityIcon className={"h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-300"} />
            <div className={"w-full"}>
                <p className={"font-semibold text-neutral-700 dark:text-neutral-300 mb-2"}>
                    Activity
                </p>
                <ol className={"mt-2 space-y-4"}>
                    {items.map((item) => <ActivityItem key={item.id} item={item} />)}
                </ol>
            </div>
        </div>
    );
}

Activity.Skeleton = function ActivitySkeleton() {
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