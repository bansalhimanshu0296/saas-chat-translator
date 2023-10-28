'use client'

import { useState } from "react"
import { Button } from "./ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

import { useToast } from "./ui/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import useAdminId from "@/hooks/useAdminId"

function DeleteChatButton({chatId}) {

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const adminId = useAdminId({chatId})
  const isAdmin = session?.user?.id === adminId

  const handleDelete = async () =>{
    toast({
        title: "Deleting Chat",
        description:
        "Please wait while we delete the chat..."
    })

    await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ chatId: chatId })
    }).then((res) => {
        if (res.status === 200){
            toast({
                title: "Success",
                description: "Your chat has been deleted!",
                className: "bg-green-600 text-white",
                duration: 3000
            })
            router.replace('/chat')
        }else{
            console.error(error.message);
            toast({
                title: "Error",
                description: `There was an error deleting your chat! ${error.message}`,
                variant: "destructive"
            })
        }
        
    }).catch((error) => {
        console.error(error.message);
        toast({
            title: "Error",
            description: `There was an error deleting your chat! ${error.message}`,
            variant: "destructive"
        })
    }).finally(() => setOpen(false))
  }

  return isAdmin && (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This will delete the chat for all users.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 space-x-2">
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteChatButton