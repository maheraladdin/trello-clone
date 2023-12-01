"use client";

import {forwardRef} from "react";
import {useFormStatus} from "react-dom";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import FormErrors from "@/components/form/form-errors";

type FormInputProps = {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue,
    onBlur
}, ref) => {
    const {pending} = useFormStatus();
    return (
        <div className={"space-y-2"}>
            <div className={"space-y-1"}>
                {label && (
                    <Label
                        htmlFor={id}
                        className={"text-xs font-semibold text-neutral-700"}

                    >
                        {label}
                    </Label>
                )}
                <Input
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    ref={ref}
                    required={required}
                    disabled={pending || disabled}
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className={cn(
                        "text-sm px-2 py-1 h-7",
                        className,
                        errors && "border border-rose-500",
                    )}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})

FormInput.displayName = "FormInput";

export default FormInput;