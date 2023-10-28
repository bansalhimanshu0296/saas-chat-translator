import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

function UserAvatar({name, image, className}) {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
        {image && (
            <Image
             src={image}
             alt={name || "User Name".split(" ")
             .map((n)=>n[0])
             .join("")}
             width={40}
             height={40}
             className="rounded-full"
            />
        )}
        {!image && <AvatarFallback 
         delayMs={1000}
         className="dark:bg-white dark:text-black text-lg">
            {
                name || "User name".split(" ")
                .map((n)=>n[0])
                .join("")
            }
        </AvatarFallback>}
    </Avatar>
  )
}

export default UserAvatar