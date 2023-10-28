'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSubscriptionStore } from "@/store/store"
import { StarIcon } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import LoadingSpinner from "./LoadingSpinner"
import ManageAccountButton from "./ManageAccountButton"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"

function UserButton({session}) {

  const subscription = useSubscriptionStore((state)=> state.subscription)
  if(!session) return(
    <Button variant={'outline'} onClick={() => signIn()}>
        Sign In
    </Button>
  )
  return (
    session && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar name={session.user?.name} image={session.user?.image}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Hi, {session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {subscription === undefined && (
                    <DropdownMenuItem>
                        <LoadingSpinner/>
                    </DropdownMenuItem>
                )}
                {subscription?.role === "pro" && subscription?.status === "active" &&(
                    <>
                        <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
                            <StarIcon fill="#E935C1"/>
                            <p>PRO</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <ManageAccountButton/>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem onClick={()=>signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  )
}

export default UserButton