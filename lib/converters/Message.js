import { db } from "@/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";

const messageConverter = {
    toFirestore: function(message){
        return{
            input: message.input,
            timestamp: message.timestamp,
            user: message.user
        }
    },
    fromFirestore: function(snaphot, options){
        const data = snaphot.data(options);
       
        return{
            id: snaphot.id,
            input: data.input,
            timestamp: data.timestamp?.toDate(),
            user: data.user,
            translated: data.translated
        }    
    }
}

export const messagesRef = (chatId) => collection(db, "chats", chatId, "messages").withConverter(messageConverter)

export const limitedMessagesRef = (chatId) => query(messagesRef(chatId), limit(25))

export const sortedMessagesRef = (chatId) => query(messagesRef(chatId), orderBy("timestamp", "asc"))

export const limitedSortedMessagesRef = (chatId) => query(query(messagesRef(chatId), limit(1)), orderBy("timestamp", "desc")).withConverter(messageConverter)
