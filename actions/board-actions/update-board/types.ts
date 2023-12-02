import {z} from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateBoardSchema } from "./schema";

export type UpdateBoardInput = z.infer<typeof UpdateBoardSchema>;
export type UpdateBoardOutput = ActionState<UpdateBoardInput, Board>;