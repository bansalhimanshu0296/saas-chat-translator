import { authOptions } from "@/auth"
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

async function ChatPage({params:{chatId}}) {

  const session = await getServerSession(authOptions);
  
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  )

  const isExist = (await getDocs(chatMembersRef(chatId))).docs.map(
    (doc) => doc?.id
  ).length

  if(isExist === 0){
    redirect('/chat?error=notExist')
  }


  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs.map(
    (doc) => doc?.id
  ).includes(session?.user?.id);

  if(!hasAccess){
    redirect('/chat?error=permission')
  }
  
  return (
    <>
        {/* Admin Controls */}
        <AdminControls chatId={chatId}/>

        {/* Chat Members */}
        <ChatMembersBadges chatId={chatId}/>
        {/* Chat Messages */}
        <div className="flex-1">
          <ChatMessages
           chatId={chatId}
           session={session}
           initialMessages={initialMessages}
          />
        </div>
        {/* Chat Input */}
        <ChatInput chatId={chatId}/>
    </>
  )
}

export default ChatPage