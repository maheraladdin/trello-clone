import { XCircle } from "lucide-react";

type FormErrorsProps = {
    id?: string;
    errors?: Record<string, string[] | undefined>;
}

export default function FormErrors({id, errors}: FormErrorsProps) {

    return (
        <>
        {errors && (
            <div
                id={`${id}-error`}
                aria-live={"polite"}
                className={"mt-2 text-xs text-rose-500 space-y-2"}
            >
                {errors?.[id as string]?.map((error: string) => {
                    return (
                        <div key={error} className={"flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"}>
                            <XCircle className={"h-4 w-4 mr-2"} />
                            {error}
                        </div>
                    )
                })}
            </div>
        )}
        </>
    )
}