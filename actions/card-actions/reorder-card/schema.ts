import {z} from "zod";

export const ReorderCardSchema = z.object({
    boardId: z.string({
        required_error: "Board ID is required",
        invalid_type_error: "Board ID is required as a string",
    }).cuid("Board ID must be a valid ID"),
    items: z.array(z.object({
        id: z.string({
              required_error: "Item ID is required",
              invalid_type_error: "Item ID must be a string",
         }).cuid("Item ID must be a valid ID"),
        title: z.string({
            required_error: "Item title is required",
            invalid_type_error: "Item title must be a string",
        }),
        order: z.number({
            required_error: "Item order is required",
            invalid_type_error: "Item order must be a number",
        }).int().positive("Item order must be a positive number"),
        listId: z.string({
            required_error: "Item listId is required",
            invalid_type_error: "Item listId must be a string",
        }).cuid("Item listId must be a valid ID"),
        createdAt: z.date({
            required_error: "Item createdAt is required",
            invalid_type_error: "Item createdAt must be a date",
        }),
        updatedAt: z.date({
            required_error: "Item updatedAt is required",
            invalid_type_error: "Item updatedAt must be a date",
        }),
    })),
});

