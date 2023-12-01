import {z} from "zod";

export const CreateBoardSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters"),
});

