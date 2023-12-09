import {z} from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { ReorderCardSchema } from "./schema";

export type InputType = z.infer<typeof ReorderCardSchema>;
export type OutputType = ActionState<InputType, Card[]>;