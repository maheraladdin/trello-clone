import {ElementRef, forwardRef, KeyboardEventHandler, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Plus, XIcon} from "lucide-react";
import FormTextarea from "@/components/form/form-textarea";
import FormButton from "@/components/form/form-button";
import useAction from "@/hooks/use-action";
import {createCard} from "@/actions/card-actions";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {useParams} from "next/navigation";

type CardFormProps = {
    listId: string,
    boardId: string,
    isEditing: boolean,
    enableEditing: () => void,
    disableEditing: () => void,
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({listId, isEditing, enableEditing, disableEditing, boardId}: CardFormProps,ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const {execute, fieldErrors} = useAction(createCard, {
        enableToast: true,
        toastLoadingMessage: "Creating card...",
        toastSuccessMessage: "Card created successfully!",
        toastErrorMessage: "Failed to create card: ",
    })

    const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") disableEditing();
    };

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = formData.get("boardId") as string;

        await execute({title, listId, boardId});
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }

    if(isEditing) return (
        <form
            className={"m-1 py-0.5 px-1 space-y-4"}
            action={onSubmit}
        >
            <FormTextarea
                id={"title"}
                ref={ref}
                placeholder={"Enter a title for this card..."}
                errors={fieldErrors}
                onKeyDown={onTextareaKeyDown}
            />
            <input
                id={"listId"}
                type="hidden"
                name={"listId"}
                value={listId}
            />
            <input
                id={"boardId"}
                type="hidden"
                name={"boardId"}
                value={boardId}
            />
            <div className={"flex items-center justify-between gap-x-1"}>
                <FormButton
                    variant={"primary"}
                    className={"px-2 py-1.5 text-sm font-medium"}
                    type={"submit"}
                >
                    Add card
                </FormButton>
                <Button
                    onClick={disableEditing}
                    size={"sm"}
                    variant={"ghost"}
                >
                    <XIcon className={"h-4 w-4"} />
                </Button>
            </div>
        </form>
    )

    return(
        <div className={"pt-2 px-2"}>
            <Button
                onClick={enableEditing}
                className={"h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"}
                size={"sm"}
                variant={"ghost"}
            >
                <Plus className={"h-4 w-4 mr-2"} />
                Add a card
            </Button>
        </div>
    )
});

CardForm.displayName = "CardForm";

export default CardForm;