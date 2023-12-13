import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {EntityType} from "@prisma/client";

export async function GET(req: Request, {params}: { params: { cardId: string } }) {
    try {

        const {userId, orgId} = auth();

        if(!userId || !orgId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const {cardId: entityId} = params;

        const auditLogs = await db.auditLog.findMany({
            where: {
                orgId,
                entityId,
                entityType: EntityType.CARD,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });

        return NextResponse.json(auditLogs);

    } catch (error) {
        return new NextResponse("Internet Error", {status: 500})
    }
}