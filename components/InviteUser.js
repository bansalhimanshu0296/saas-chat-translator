'use client'

import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage
} from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"
import { getDocs, query, serverTimestamp, setDoc } from "firebase/firestore"
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import useAdminId from "@/hooks/useAdminId"
import { PlusCircleIcon } from "lucide-react"
import { useSubscriptionStore } from "@/store/store"
import { ToastAction } from "./ui/toast"
import { useRouter } from "next/navigation"
import { getUserByEmailRef } from "@/lib/converters/User"
import ShareLink from "./ShareLink"


const formSchema = z.object({
    email: z.string().email("Please enter a valid email address")
})

function InviteUser({chatId}) {

  const { data: session } = useSession()
  const { toast } = useToast();
  const adminId = useAdminId({ chatId })
  const subscription = useSubscriptionStore((state) => state.subscription)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [openInviteLink, setOpenInviteLink] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email:""
    }
  })

  async function onSubmit(values){
    if(!session?.user?.id) return;

    toast({
        title: "Sending invite",
        description: "Please wait while we send the invite..."
    })

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
        (doc) => doc.data()
    ).length

    const isPro = subscription?.role === "pro" && subscription?.status === "active"

    if(!isPro && noOfUsersInChat >= 2){
        toast({
            title: "Free plan limit exceeded",
            description: 
            "You have exceeded the limit of users in a single chat for the free plan. Please upgrade to PRO to continue adding users to the chats!",
            variant: "destructive",
            action:(
                <ToastAction
                 altText="Upgrade"
                 onClick={() => router.push("/register")}>
                    Upgrade to PRO
                </ToastAction>
            )
        })
        return;
    }
    const querySnapshot = await getDocs(getUserByEmailRef(values.email))

    if(querySnapshot.empty){
        toast({
            title: "User not found",
            description:
            "Please enter an email address of registered user OR resend the invitation once they have signed up!",
            variant: "destructive",
        })
        return;
    }else{
        const user = querySnapshot.docs[0].data()
        await setDoc(addChatRef(chatId, user?.id),{
            userId: user?.id,
            email: user?.email,
            timestamp: serverTimestamp(),
            chatId: chatId,
            isAdmin: false,
            image: user?.image || ""
        }).then(()=>{
            setOpen(false)
            toast({
                title: "Added to chat",
                description:
                "The user has been added to the chat successfully!",
                className: "bg-green-600 text-white",
                duration: 3000
            })
            setOpenInviteLink(true)
        }).catch(()=>{
            toast({
                title: "Error",
                description:
                "Whoops... there was an error adding the user to the chat!",
                variant: "destructive"
            })
            setOpen(false)
        })
    }
    form.reset()
  }

  const isAdmin = adminId === session?.user?.id

  return (
    isAdmin && (<>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircleIcon className="mr-1"/>
                    Add User To Chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add User to Chat</DialogTitle>
                    <DialogDescription>
                        Simply enter another users email address to invite them to this chat!{" "}
                        <span className="text-indigo-600 font-bold">
                            (Note: they must be registered)
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="flex flex-col space-y-2"
                    >
                        <FormField
                         control={form.control}
                         name="email"
                         render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="john@doe.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}
                        />
                        <Button className="ml-auto w-full" type="submit">
                            Add To Chat
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        <ShareLink
         isOpen={openInviteLink}
         setIsOpen={setOpenInviteLink}
         chatId={chatId}
        />
    </>)
  )
}

export default InviteUser