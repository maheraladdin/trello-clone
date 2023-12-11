import {Card, List} from "@prisma/client";

export type CardWithList = Card & { list: List };

export type ListWithCards = List & { Cards: Card[] };