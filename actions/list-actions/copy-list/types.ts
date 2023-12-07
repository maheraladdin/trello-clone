import {z} from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CopyListSchema } from "./schema";

export type InputType = z.infer<typeof CopyListSchema>;
export type OutputType = ActionState<InputType, List>;