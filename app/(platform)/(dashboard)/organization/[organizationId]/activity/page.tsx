import { Separator } from "@/components/ui/separator";
import Info from "../_components/info";
import {Suspense} from "react";
import ActivityList from "./_components/activity-list";
import {checkSubscription} from "@/lib/subscription";

export default async function ActivityPage() {

    const isPro = await checkSubscription();

    return (
      <div className={"w-full mb-10"}>
          <Info isPro={isPro}/>
          <Separator className={"my-2"} />
          <Suspense fallback={<ActivityList.Skeleton />}>
              <ActivityList />
          </Suspense>
      </div>
    );
}