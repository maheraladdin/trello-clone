import {z} from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type OutputType = ActionState<InputType, Card>;