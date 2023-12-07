"use client";

import {useFormStatus} from "react-dom";
import {forwardRef, KeyboardEventHandler} from "react";

import FormErrors from "@/components/form/form-errors";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

type FormTextareaProps = {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue,
    onBlur,
    onClick,
    onKeyDown,
}, ref) => {
    const {pending} = useFormStatus();
    return (
        <div className={"space-y-2 w-full"}>
            <div className={"space-y-1 w-full"}>
                {label && (
                    <Label
                        htmlFor={id}
                        className={"text-xs font-semibold text-neutral-700"}
                    >
                        {label}
                    </Label>
                )}
                <Textarea
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    ref={ref}
                    required={required}
                    disabled={pending || disabled}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none shadow-sm",
                        className,
                    )}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    aria-describedby={`${id}-error`}
                />
            </div>
            {errors && <FormErrors id={id} errors={errors} />}
        </div>
    )
});

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
