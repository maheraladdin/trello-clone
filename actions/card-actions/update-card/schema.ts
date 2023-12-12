import {z} from "zod";

export const UpdateCardSchema = z.object({
    title: z.optional(
        z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required as a string",
    }).min(3, "Title must be at least 3 characters")
    ),
    id: z.string({
        required_error: "Id is required",
        invalid_type_error: "Id is required as a string",
    }).cuid("Id must be a valid id"),
    boardId: z.string({
        required_error: "BoardId is required",
        invalid_type_error: "BoardId is required as a string",
    }).cuid("BoardId must be a valid id"),
    description: z.optional(
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description is required as a string",
        }).min(3, "Description must be at least 3 characters")
    ),
});

