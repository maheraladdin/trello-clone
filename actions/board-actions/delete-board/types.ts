import {z} from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteBoardSchema } from "./schema";

export type DeleteBoardInput = z.infer<typeof DeleteBoardSchema>;
export type DeleteBoardOutput = ActionState<DeleteBoardInput, Board>;