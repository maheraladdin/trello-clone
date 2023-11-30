import {db} from "@/lib/db";

export default function OrganizationIdPage({params}: {params: {organizationId: string}}) {
    const {organizationId} = params;

    async function createBoard(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;

        await db.board.create({
            data: {
                title,
            }
        })

        formData.set("title", "");
    }

    return (
        <div>
            <form action={createBoard}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter a board title"
                    className={"border border-input rounded-md p-2 w-full text-sm"}
                    required
                />
            </form>
        </div>
    )
}