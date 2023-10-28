'use client'

import { auth } from "@/firebase"
import { signInWithCustomToken } from "firebase/auth"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

async function syncFirebaseAuth(session){
    if(session && session.firebaseToken){
        try{
            await signInWithCustomToken(auth, session.firebaseToken);
        }catch(error){
            console.log("Error signing in with custom token:", error);
        }
    }else{
        auth.signOut();
    }
}

function FirebaseAuthProvider({children}) {
  const {data:session} = useSession();
  useEffect(()=>{
    if(!session) return;
    syncFirebaseAuth(session);
  },[session])
  return (
    <>{children}</>
  )
}

export default FirebaseAuthProvider