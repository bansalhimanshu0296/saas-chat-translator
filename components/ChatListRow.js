'use client'

import { limitedSortedMessagesRef } from "@/lib/converters/Message"
import { useLanguageStore } from "@/store/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Skeleton } from "./ui/skeleton"
import UserAvatar from "./UserAvatar"

function ChatListRow({chatId}) {
  let [messages, loading, error] = useCollectionData(limitedSortedMessagesRef(chatId))
  
  const Language = useLanguageStore(state => state.language)


  const router = useRouter()

  const {data: session} = useSession()
  
  function preetyUUID(n=4){
    return chatId.substring(0,n)
  }
  const row = (message) =>(
    
    <div key={chatId} onClick={() => router.push(`/chat/${chatId}`)}
     className='p-5 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700'>
      <UserAvatar name={message?.user?.name || session?.user?.name} image={message?.user?.image || session?.user?.image} />
      <div className="flex-1">
        <p className="font-bold">
          {!message && "New Chat"}
          {message && [message?.user?.name || session?.user?.name].toString().split(" ")[0]}
        </p>
        <p className="text-gray-400 line-clamp-1">
          {message?.translated?.[Language] || "Get the conversation started..."}
        </p>
      </div>
      <div className="ext-xs text-gray-400 text-right">
        <p className="mb-auto">
          {message ? new Date(message?.timestamp).toLocaleTimeString() : "No message yet"}
        </p>
        <p className="">chat #{preetyUUID()}</p>
      </div>
    </div>
  )
  return (
    <div>
      {loading && (
        <div className="flex p-5 items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full"/>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full"/>
            <Skeleton className="h-4 w-1/4"/>
          </div>
        </div>
      )}
      {messages?.length === 0 && !loading && row()}
      {messages?.length !== 0 && !loading && messages?.map((message)=>row(message))}
    </div>
  )
}

export default ChatListRow