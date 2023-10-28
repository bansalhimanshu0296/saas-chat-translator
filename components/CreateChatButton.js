'use client'

import { useSubscriptionStore } from '@/store/store'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { v4 as uuidv4 } from 'uuid'
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { addChatRef, chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { ToastAction } from './ui/toast'

function CreateChatButton({isLarge}) {
  const router = useRouter();
  const {data:session} = useSession();
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const subscription = useSubscriptionStore((state)=> state.subscription)
  
  const createNewChat = async() => {
    if(!session?.user?.id) return;
    setLoading(true);
    toast({
        title: 'Creating new chat...',
        description: 'Hold tight while we create your new chat...',
        duration: 3000
    })
    // TODO: Check if user is pro and limit them creating a new chat
    const noOfChats = (
        await getDocs(chatMembersCollectionGroupRef(session?.user?.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === "pro" && subscription?.status === "active"
    
    if(!isPro && noOfChats >= 3){
        toast({
            title: "Free plan limit exceeded",
            description:
                "You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue to create new chats!",
            variant: "desctructive",
            action: (
                <ToastAction
                 altText="Upgrade"
                 onClick={() => router.push("/register")}>
                    Upgrade to PRO
                </ToastAction>
            )
        })
    }

    const chatId = uuidv4()
    await setDoc(addChatRef(chatId, session?.user?.id),{
        userId: session?.user?.id,
        email: session?.user?.email,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId: chatId,
        image: session?.user?.image || ""
    }).then(()=>{
        toast({
            title: 'Success',
            description: 'Your chat has been created!',
            className: 'bg-green-600 text-white',
            duration: 2000
        })
        router.push(`/chat/${chatId}`)
    }).catch(()=>{
        toast({
            title: 'Error',
            description: 'There was an error creating your chat!',
            variant: 'destructive'
        })
    }).finally(()=>{
        setLoading(false)
    })
  }

  if(isLarge){
    return(
        <div>
            <Button variant={"default"} onClick={createNewChat}>
                {loading?<LoadingSpinner/>:"Create a New Chat"}
            </Button>
        </div>
    )
  }

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
        <MessageSquarePlusIcon />
    </Button>
  )
}

export default CreateChatButton