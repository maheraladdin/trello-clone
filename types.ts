import {Card, List} from "@prisma/client";

export type CardWithList = Card & { List: List };

export type ListWithCards = List & { Cards: Card[] };