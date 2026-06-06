import { Button } from "@/components/ui/button"

interface OutlineButtonProps {
    name: string
}

export const OutlineButton = ({ name }: OutlineButtonProps) => {
    return (
        <Button
            variant="outline"
            className="btn-outline text-2xl cursor-pointer md:px-20 px-10 md:py-9 py-6 rounded-lg"
        >
            {name}
        </Button>

    )
}
