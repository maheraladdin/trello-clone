import {z} from "zod";

export const CopyCardSchema = z.object({
    id: z.string({
        required_error: "Id is required",
        invalid_type_error: "Id is required as a string",
    }).cuid("Id must be a valid id"),
    boardId: z.string({
        required_error: "Board id is required",
        invalid_type_error: "Board id is required as a string",
    }).cuid("Board id must be a valid id"),
});

