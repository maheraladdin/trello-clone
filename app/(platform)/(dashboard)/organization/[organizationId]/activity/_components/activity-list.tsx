import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {ActivityItem} from "@/components/activity-item";

export default async function ActivityList() {

    const {orgId} = auth();

    if(!orgId) redirect("/select-org");

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <ol className={"mt-4 space-y-4"}>
            <p className={"hidden last:block text-xs text-center text-muted-foreground"}>
                No activity yet.
            </p>
            {
                auditLogs.map((log) => (
                    <ActivityItem key={log.id} item={log} />
                ))
            }
        </ol>
    );
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className={"mt-4 space-y-4"}>
            <Skeleton className={"w-4/5 h-14"} />
            <Skeleton className={"w-1/2 h-14"} />
            <Skeleton className={"w-[70%] h-14"} />
            <Skeleton className={"w-4/5 h-14"} />
            <Skeleton className={"w-3/4 h-14"} />
        </ol>
    );
}