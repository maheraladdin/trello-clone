import {forwardRef} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type CardFormProps = {
    listId: string,
    isEditing: boolean,
    enableEditing: () => void,
    disableEditing: () => void,
}

const CardForm = forwardRef(({listId, isEditing, enableEditing, disableEditing}: CardFormProps,ref) => {
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