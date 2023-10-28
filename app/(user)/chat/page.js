import ChatList from "@/components/ChatList"
import ChatPermissionError from "@/components/ChatPermissionError"

function ChatsPage({searchParams: {error}}) {
  return (
    <div>
        {/* Chat Permission Error */}
        {error && (
          <div className="m-2">
            <ChatPermissionError error={error}/>
          </div>
        )}

        {/* ChatList */}
        <ChatList/>
    </div>
  )
}

export default ChatsPage