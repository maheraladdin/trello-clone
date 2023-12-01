import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

type HintProps = {
    children: React.ReactNode;
    hint: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    delayDuration?: number;
}

export default function Hint({
    children,
    hint,
    side = "bottom",
    sideOffset = 0,
    delayDuration = 0
}: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={delayDuration}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    sideOffset={sideOffset}
                    className={"text-xs max-w-[220px] break-words"}
                >
                    {hint}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}