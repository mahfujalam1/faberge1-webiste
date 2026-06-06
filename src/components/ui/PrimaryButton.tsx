import { Button } from "@/components/ui/button"

interface PrimaryButtonProps {
    name: string
}

export const PrimaryButton = ({ name }: PrimaryButtonProps) => {
    return (
        <Button className="btn text-2xl cursor-pointer md:px-20 px-10 md:py-10 py-7">
            {name}
        </Button>

    )
}
