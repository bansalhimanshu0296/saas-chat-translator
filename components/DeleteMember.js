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

import { toast, useToast } from "./ui/use-toast"
import { XCircle } from "lucide-react"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"




function DeleteMember({ chatId, memberId }) {

    const [open, setOpen] = useState(false)

    const handleDelete = async () =>{

        toast({
            title: "Removing Member",
            description:
            "Please wait while we remove the member from the chat..."
        })
    
        
        await deleteDoc(doc(db, 'chats', chatId, 'members', memberId)).then(() => {
            toast({
                title: "Success",
                description: "Chat member has been removed!",
                className: "bg-green-600 text-white",
                duration: 3000
            })
        }).catch((error) => {
            console.error(error.message);
            toast({
                title: "Error",
                description: `There was an error removing member! ${error.message}`,
                variant: "destructive"
            })
        }).finally(() => setOpen(false))

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <XCircle className="text-red-600 w-11 h-11 hover:animate-pulse"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This will delete the user from the chat.
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
        </Dialog>)
}

export default DeleteMember