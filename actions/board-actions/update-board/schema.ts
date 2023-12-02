import {z} from "zod";

export const UpdateBoardSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required as a string",
    }).min(3, "Title must be at least 3 characters"),
    id: z.string({
        required_error: "Id is required",
        invalid_type_error: "Id is required as a string",
    }).cuid("Id must be a valid id"),
});

