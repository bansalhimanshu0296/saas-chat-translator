import { db } from "@/firebase";
import { collection, collectionGroup, doc, query, where } from "firebase/firestore";

const chatMembersConverter = {
    toFirestore: function(member){
        return{
            userId: member.userId,
            email: member.email,
            timestamp: member.timestamp,
            isAdmin: !!member.isAdmin,
            chatId: member.chatId,
            image: member. image
        }
    },
    fromFirestore: function(snaphot, options){
        const data = snaphot.data(options);
       
        return{
            userId: snaphot.id,
            email: data.email,
            timestamp: data.timestamp,
            isAdmin: data.isAdmin,
            chatId: data.chatId,
            image: data. image
        }    
    }

}

export const addChatRef = (chatId, userId) => doc(db, 'chats', chatId, 'members', userId).withConverter(chatMembersConverter);

export const chatMembersRef = (chatId) => collection(db, 'chats', chatId, 'members').withConverter(chatMembersConverter);

export const chatMemberAdminRef = (chatId) => query(
    collection(db, 'chats', chatId, 'members'),
    where("isAdmin" , "==", true)
).withConverter(chatMembersConverter)

export const chatMembersCollectionGroupRef = (userId) => query(
    collectionGroup(db, "members"),
    where("userId", "==", userId)
).withConverter(chatMembersConverter)
