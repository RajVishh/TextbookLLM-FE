import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function AvatarDemo({ pictureUrl, name }: { pictureUrl: string, name: string }) {

    return (
        <Avatar>
            <AvatarImage
                src={pictureUrl}
                alt={name}
                className="grayscale"
            />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
    )
}
