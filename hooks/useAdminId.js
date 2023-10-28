'use client'

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers"
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

function useAdminId({ chatId }) {
  
  const [adminId, setAdminId] = useState("")

  useEffect(()=>{
    const fetchAdminStatus = async () =>{
        const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
            (doc) => doc.id)[0];
        setAdminId(adminId);
    }
    fetchAdminStatus();
  }, [chatId])
  
  return adminId
}

export default useAdminId