import {z} from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { ReorderListSchema } from "./schema";

export type InputType = z.infer<typeof ReorderListSchema>;
export type OutputType = ActionState<InputType, List[]>;