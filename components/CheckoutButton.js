'use client'

import { db } from "@/firebase";
import { useSubscriptionStore } from "@/store/store";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ManageAccountButton from "./ManageAccountButton";

function CheckoutButton() {

  const {data:session} = useSession();
  console.log(useSession())
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((store)=>store.subscription)

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active" && subscription?.role === "pro";

  const createCheckoutSession = async () =>{
    if(!session?.user.id) return;
    // push a document into firebase db
    setLoading(true)

    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'),{
        price: "price_1O4JtsJ5VUfcwtGe43hMWLo9",
        success_url: window.location.origin,
        cancel_url: window.location.origin 
    });
    // ... stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, snap => {
        const data = snap.data();
        const url = data?.url;
        const error = data?.error;
        if(error){
            alert(`An error occured: ${error.message}`);
            setLoading(false);
        }
        if(url){
            window.location.assign(url);
            setLoading(false);
        }
    })

    // redirect user to checkout page
  }
  return (
    <div className="flex flex-col space-y-2">
        {
            isSubscribed &&(
                <>
                    <hr className="mt-5"/>
                    <p className="pt-5 text-center text-xs text-indigo-600">
                        You are subscribed to PRO
                    </p>
                </>
            )
        }
        <div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold
        leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 
        disabled:text-white disabled:cursor-default">
            {isSubscribed ? <ManageAccountButton/>:
             isLoadingSubscription || loading ? <LoadingSpinner/> : 
             <button onClick={() => createCheckoutSession()}>Sign Up</button>}
        </div>
    </div>
    )
}

export default CheckoutButton