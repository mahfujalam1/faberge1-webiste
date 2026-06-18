import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PrimaryButtonProps {
    name: string
    className?: string
}

export const PrimaryButton = ({ name, className }: PrimaryButtonProps) => {
    return (
        <Button className={cn("btn text-xl cursor-pointer md:px-20 px-10 md:py-9 py-5", className)}>
            {name}
        </Button>

    )
}
