import {Action, AuditLog} from "@prisma/client";
import _ from "lodash";

export const generateLogMessage = (log: AuditLog) => {
    const {action, entityType, entityTitle} = log;

    switch (action) {
        case Action.CREATE:
            return `Created ${_.lowerCase(entityType)} "${entityTitle}"`;
        case Action.UPDATE:
            return `Update ${_.lowerCase(entityType)} "${entityTitle}"`;
        case Action.DELETE:
            return `Delete ${_.lowerCase(entityType)} "${entityTitle}"`;
        case Action.COPY:
            return `Copy ${_.lowerCase(entityType)} "${entityTitle}"`;
        case Action.REORDER:
            return `Reorder ${_.lowerCase(entityType)} "${entityTitle}"`;
        default:
            return `Unknown action ${_.lowerCase(entityType)} "${entityTitle}"`;
    }

}