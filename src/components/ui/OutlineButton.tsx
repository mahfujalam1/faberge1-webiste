import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface OutlineButtonProps {
    name: string
    className?: string
}

export const OutlineButton = ({ name, className }: OutlineButtonProps) => {
    return (
        <Button
            variant="outline"
            className={cn("btn-outline text-xl cursor-pointer w-[250px]  md:px-20 px-10 md:py-8 py-5 rounded-lg", className)}
        >
            {name}
        </Button>

    )
}
