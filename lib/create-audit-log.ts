import {auth, currentUser} from "@clerk/nextjs";
import {Action, EntityType} from "@prisma/client";

import {db} from "./db";

type CreateAuditLogProps = {
    entityId: string;
    entityType: EntityType;
    entityTitle: string;
    action: Action;
}

export default async function createAuditLog(props: CreateAuditLogProps) {
    try {
        const {orgId} = auth()
        const user = await currentUser();

        if(!user || !orgId) throw new Error("User or OrgId not found");

        const {entityId, entityType, entityTitle, action} = props;

        await db.auditLog.create({
            data: {
                action,
                entityTitle,
                entityType,
                entityId,
                orgId,
                userId: user.id,
                userImage: user.imageUrl,
                userName: `${user.firstName} ${user.lastName}`
            }
        });

    } catch (error) {
        console.error("[AUDIT_LOG_ERROR]: ",error)
    }
}