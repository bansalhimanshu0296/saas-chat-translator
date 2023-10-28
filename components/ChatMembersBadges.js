'use client'

import useAdminId from "@/hooks/useAdminId"
import { chatMembersRef } from "@/lib/converters/ChatMembers"
import { useSession } from "next-auth/react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import LoadingSpinner from "./LoadingSpinner"
import { Badge } from "./ui/badge"
import UserAvatar from "./UserAvatar"
import DeleteMember from "./DeleteMember"


function ChatMembersBadges({chatId}) {
  const [members, loading, error] = useCollectionData(chatMembersRef(chatId))
  const {data: session} =  useSession();
  
  const adminId = useAdminId({chatId})

  if(loading && !members) return <LoadingSpinner/>

  return (
    !loading && (
        <div className="p-2 border rounded-xl m-5">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
                {members?.map((member)=>(
                    <Badge variant="secondary"
                     key={member?.email}
                     className="h-14 p-5 pl-2 pr-5 flex space-x-2"
                    >
                        <div className="flex items-center space-x-2">
                            <UserAvatar name={member?.email} image={member?.image} />
                        </div>
                        <div>
                            <p>{member?.email}</p>
                            {member?.userId === adminId && (
                                <p className="text-indigo-400 animate-pulse">Admin</p>
                            )}
                        </div>
                        {session?.user?.id === adminId && member?.userId !== adminId && (
                                <DeleteMember chatId={chatId} memberId={member?.userId}/>
                            
                        )}
                    </Badge>
                ))}
            </div>
        </div>
    )
  )
}

export default ChatMembersBadges