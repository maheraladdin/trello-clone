import {z} from "zod";

export const DeleteBoardSchema = z.object({
    id: z.string({
        required_error: "Id is required",
        invalid_type_error: "Id is required as a string",
    }).cuid("Id must be a valid id"),
});

