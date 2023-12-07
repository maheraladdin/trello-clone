import {z} from "zod";

export const CreateCardSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required as a string",
    }).min(3, "Title must be at least 3 characters"),
    listId: z.string({
        required_error: "List ID is required",
        invalid_type_error: "List ID is required as a string",
    }).cuid("List ID must be a valid ID"),
    boardId: z.string({
        required_error: "Board ID is required",
        invalid_type_error: "Board ID is required as a string",
    }).cuid("Board ID must be a valid ID"),
});

