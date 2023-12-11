import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

import {db} from "@/lib/db";

export async function GET(req: Request, {params}: { params: { cardId: string } }) {
  try {
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const {cardId: id} = params;

    const card = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          }
        }
      },
      include: {
        list: {
          select: {
            title: true,
          }
        }
      }
    })

    return NextResponse.json(card);

  } catch (error) {
    return new NextResponse("Internet Error", {status: 500})
  }
}