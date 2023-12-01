"use client";

import {useFormStatus} from "react-dom";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import React from "react";

type FormSubmitButtonProps = {
    className?: string;
    type?: "submit" | "reset" | "button";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    disabled?: boolean;
    children?: React.ReactNode;
    onLoadingLabel?: string;
}

export default function FormButton({
    className,
    type = "submit",
    variant = "primary",
    size = "default",
    disabled,
    children,
    onLoadingLabel
}: FormSubmitButtonProps) {
    const {pending} = useFormStatus();

    return (
        <Button
            type={type}
            disabled={pending || disabled}
            variant={variant}
            size={size}
            className={cn(className)}
        >
            {pending && onLoadingLabel ? onLoadingLabel : children}
        </Button>
    )
}