import {z} from "zod";

export const CreateBoardSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required as a string",
    }).min(3, "Title must be at least 3 characters"),
    image: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image is required as a string",
    })
});

